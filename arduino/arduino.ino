#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h> 
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>

WiFiClient client;
const int   port = 8000;
const char *ssid = "Shaza-Fatima";  
const char *password = "81930186";
const char *h = "127.0.0.1";
 
//Web/Server address to read/write from 
const char *host = "http://127.0.0.1:8000/new-history";   //your IP/web server address

// #include <Servo.h>
// #include <DHT.h>

// #define DHTPIN 10// Analog Pin sensor is connected to
// #define DHTTYPE DHT11 
// DHT dht(DHTPIN, DHTTYPE);

// Servo rainServo;
// int flameBuzzer=4;
// int flameSensor=8;
// int ldr=A0;
// int led=7;
// int rainSensor=2;
void setup() {
  delay(1000);
  // rainServo.attach(9);
  // pinMode ( flameBuzzer , OUTPUT ); // declaring Buzzer pin as output pin
  // pinMode ( flameSensor , INPUT );  // declaring sensor pin as input pin for Arduino
  // pinMode ( ldr , INPUT );
  // pinMode ( led , OUTPUT );
  // pinMode ( rainSensor , INPUT );
  /////////////////
//    Serial.println("DHT11 Humidity & temperature Sensor\n\n");
//   delay(100);//Wait before accessing Sensor
//  dht.begin();
 Serial.begin(115200);
  WiFi.mode(WIFI_OFF);        //Prevents reconnection issue (taking too long to connect)
  delay(1000);
  WiFi.mode(WIFI_STA);        //This line hides the viewing of ESP as wifi hotspot
  
  WiFi.begin(ssid, password);     //Connect to your WiFi router
  Serial.println("");
 
  Serial.print("Connecting");
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
 
  //If connection successful show IP address in serial monitor
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  //IP add
}

void loop() {
    HTTPClient http;
  //Prepare data
  String activity,postData;
  int user_id;
  activity= "arduinooooo request";
  user_id = 1;
 
  //prepare request
  postData = "activity=" + activity + "&user_id=" + user_id ;
  http.begin(client,host);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  int httpCode = http.POST(postData);
  String payload = http.getString();
 
if (httpCode>0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpCode);
    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpCode);
    }
  http.end();
  delay(5000);
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
  // if (rainRead == LOW ){

  //    rainServo.write(180);       
  // }
  // else{
  //   rainServo.write(90);  
  // }

  // ////////////////////////
  // float h = dht.readHumidity();  
  // delay(10);
  // float t = dht.readTemperature(); 
  //   if (isnan(h) || isnan(t) ) {
  //   Serial.println(F("Failed to read from DHT sensor!"));
  //   return;
  // }
  // Serial.print(F(" Humidity: "));
  // Serial.println(h);
  // Serial.print(F("%  Temperature: "));
  // Serial.println(t);


}