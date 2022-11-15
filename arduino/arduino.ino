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
  // delay(200);
   Serial.begin(9600); 
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
pinMode ( D4 , OUTPUT );
}

void loop() {
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
   digitalWrite ( D4 , HIGH ) ;
   delay(1000);
   digitalWrite ( D4 , LOW ) ;
   delay(1000);
   Serial.println("hellooooo");

}
