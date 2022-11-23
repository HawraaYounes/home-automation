#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h> 
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include "DHT.h" 
#include <ArduinoJson.h>
#include <Servo.h>
       // DHT11 temperature and humidity sensor Predefined library
#define DHTTYPE DHT11   // DHT 11
#define dht_dpin 2 //D4
#define led 15//D8
#define servoPin 4//D2
DHT dht(dht_dpin, DHTTYPE); 
Servo myservo;
WiFiClient client;

const int   port = 8000;
const char *ssid = "Shaza-Fatima";  
const char *password = "81930186";
const char *baseURL="http://192.168.0.108/api/";
// Set web server port number to 80

//Web/Server address to read/write from 

const char *host = "http://192.168.0.108:8000/api/new-temperature";   //your IP/web server address

// #include <Servo.h>


// Servo rainServo;
// int flameBuzzer=4;
// int flameSensor=8;
// int ldr=A0;
// int led=7;
// int rainSensor=2;
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
   myservo.attach(servoPin);
   
}

void loop() {
    HTTPClient http1,http2;
  //Prepare data
  String postData;
  digitalWrite ( led , LOW ) ;
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
  http1.end(); 
  ///////check device status
   
   //prepare request
   control(1);
   control(3);
// const char *api="http://192.168.0.108:8000/api/status";
// int id=1;   
//  String  Data = String("id=") + id ;
//   http.begin(client,api);
//   http.addHeader("Content-Type", "application/x-www-form-urlencoded");
//   int Code = http.POST(Data);
//   String p = http.getString();
// if (Code<0) {
//       Serial.print("http 2 Error code: ");
//       Serial.println(Code);
//     }else{
//       Serial.println(p);
//       DynamicJsonDocument doc(5000);
//       DeserializationError error = deserializeJson(doc, p);
//     if (error) {
//     Serial.print(F("deserializeJson() failed: "));
//     Serial.println(error.f_str());
//     return;
//     }
//       JsonObject root_0 = doc[0];
//       String name = root_0["name"];
//       int status = root_0["status"]; // 1
//       Serial.println(status);
//       Serial.println("api status");
//       if(status==1){
//         if(name=="Light"){
//           digitalWrite(led,HIGH);
//         }
//       }
//     }
//   http.end(); 
  //door request
// int door_id=3;   
//  String  DoorData = String("id=") + door_id ;
//   http2.begin(client,api);
//   http2.addHeader("Content-Type", "application/x-www-form-urlencoded");
//   int DoorCode = http2.POST(DoorData);
//   String p1 = http2.getString();
// if (DoorCode<0) {
//       Serial.print("http 2 Error code: ");
//       Serial.println(DoorCode);
//     }else{
//       Serial.println(p1);
//       DynamicJsonDocument doc(5000);
//       DeserializationError error = deserializeJson(doc, p1);
//     if (error) {
//     Serial.print(F("deserializeJson() failed: "));
//     Serial.println(error.f_str());
//     return;
//     }
//       JsonObject root_0 = doc[0];
//       int Doorstatus = root_0["status"]; // 1
//       Serial.println(Doorstatus);
//       Serial.println("api door status");
//       if(Doorstatus==1){
//          myservo.write(0);
//       }
//       else{
//         myservo.write(120);
//       }
//     }
//   http2.end();                  
  // int light =analogRead(A0);
  // int Read = digitalRead ( flameSensor ) ; // reading from the sensor
  // int ldrRead = digitalRead ( ldr ) ;
  // int rainRead= digitalRead ( rainSensor ) ;
  //  if (light <150){
  //   digitalWrite ( led , HIGH ) ;// if state is high, then turn high the Buzzer
  // }
  // else{
  //   digitalWrite ( led , LOW ) ; // otherwise turn it low
  // }
  // if (Read == LOW ){
  
  //   digitalWrite ( flameBuzzer , HIGH ) ;// if state is high, then turn high the Buzzer
  // }
  // else{
  //   digitalWrite ( flameBuzzer , LOW ) ; // otherwise turn it low
  // }
  delay(2000);
}
void control(int id){
   HTTPClient http;
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
                  myservo.write(90);
                  delay(20);
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
          }
        }
        http.end();
      }
