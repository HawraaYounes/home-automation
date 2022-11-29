#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h> 
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include "DHT.h" 
#include <ArduinoJson.h>
#include <Servo.h>
    
#define DHTTYPE DHT11   // DHT 11
#define dht_dpin 2 //D4
#define lightLed 13//D7
#define led 15//D8
#define servoPin 4//D2
#define windowServoPin 0//D3
#define lightPin

#define rainSensorPin 14//D5 
#define flameBuzzer 16//D0
#define flameSensor 5//D1
int flameRead=HIGH;
DHT dht(dht_dpin, DHTTYPE); 
Servo myservo;
Servo windowServo;
WiFiClient client;
unsigned long interval1=3600000;// 1 hour time to wait 3600000
unsigned long previousMillis1=0; // millis() returns an unsigned long.
const int   port = 8000;
const char *ssid = "Shaza-Fatima";  
const char *password = "81930186";
const char *baseURL="http://192.168.0.108/api";
const char *host = "http://192.168.0.108:8000/api/new-temperature";   //your IP/web server address

WiFiServer server(80);
 
String header = "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n";
String request = "";

void setup() {
 Serial.begin(115200);
  WiFi.mode(WIFI_OFF);        //Prevents reconnection issue (taking too long to connect)
  delay(1);
  WiFi.mode(WIFI_STA);        //This line hides the viewing of ESP as wifi hotspot
  WiFi.begin(ssid, password);     //Connect to your WiFi router
  Serial.println("");
  Serial.print("Connecting");
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
  }
  //If connection successful show IP address in serial monitor
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");

  server.begin();
  
  Serial.println("Server started at...");
  Serial.println(WiFi.localIP());
  pinMode(led,OUTPUT); //IP add
  pinMode(lightLed,OUTPUT); //IP add
   myservo.attach(servoPin);
   windowServo.attach(windowServoPin);
  pinMode(flameBuzzer, OUTPUT); 
  pinMode(flameSensor, INPUT);
  pinMode(rainSensorPin,INPUT);
  digitalWrite(flameBuzzer, LOW);
  digitalWrite(lightLed,LOW);
}

void loop() {
    HTTPClient http1,http2;
  //Prepare data
   if ((unsigned long)(millis() - previousMillis1) >= interval1) {
    previousMillis1 = millis();
    // every fourth second
    // ... 
    String postData;
  float humidity = dht.readHumidity();  
  delay(1);
  float temperature = dht.readTemperature(); 
    if (isnan(humidity) || isnan(temperature) ) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  //prepare request
  postData = String("temperature=") + temperature + String("&humidity=") + humidity ;
  http1.begin(client,host);
  http1.addHeader("Content-Type", "application/x-www-form-urlencoded");
  int httpCode = http1.POST(postData);
  String payload = http1.getString();
if (httpCode<0) {
      Serial.print("Error code: ");
      Serial.println(httpCode);
    }     
    else{
      Serial.println(httpCode);
    }       
  http1.end(); 
 }
   int rainRead= digitalRead ( rainSensorPin ) ;
   if (rainRead==LOW){
    windowServo.write(180);
  }
   control(1);
   control(2);
   control(3);
       
  int light =analogRead(lightPin);
   int flameRead = digitalRead ( flameSensor ) ; 
   if(light<150){
     Serial.println(light);
     digitalWrite(lightLed,HIGH);
   }
   else{
     digitalWrite(lightLed,LOW);
   }
 
  if (flameRead == LOW ){
    Serial.println("fire");
    digitalWrite ( flameBuzzer , HIGH ) ;
   
  }
  else{
    Serial.println("no fire");
    digitalWrite ( flameBuzzer , LOW ) ; 
  }
}
void control(int id){
   HTTPClient http;
   int rainRead= digitalRead ( rainSensorPin ) ;
  const char *api="http://192.168.0.108:8000/api/status";   
  String  Data = String("id=") + id ;
    http.begin(client,api);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    int Code = http.POST(Data);
    String p = http.getString();
  if (Code<0) {
        Serial.print("http 2 Error code: ");
        Serial.println(Code);
      }else{
        Serial.println(p);
        DynamicJsonDocument doc(5000);
        DeserializationError error = deserializeJson(doc, p);
      if (error) {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
      return;
      }
        JsonObject root_0 = doc[0];
        String name = root_0["name"];
        int status = root_0["status"]; // 1
        if(status==1){
          if(name=="Light"){
            digitalWrite(led,HIGH);
          }
          else if(name=="Door"){
                  myservo.write(180);
                  delay(20);
                }  
          else if(name=="Window"){
            if(rainRead==HIGH){
            windowServo.write(0);
            delay(20);
            }
          }           
          }
          else{
                if(name=="Light"){
                  digitalWrite(led,LOW);
                }
                else if(name=="Door"){
                  myservo.write(0);
                  delay(20);
                }     
                else if(name=="Window"){
                  windowServo.write(180);
                  delay(20);
                }        
          }
        }
        http.end();
        delay(1000);
      }
