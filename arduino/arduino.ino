#include <Servo.h>
Servo rainServo;
int flameBuzzer=4;
int flameSensor=8;
int ldr=A0;
int led=7;
int rainSensor=2;
void setup() {
  Serial.begin(9600);
  rainServo.attach(9);
  pinMode ( flameBuzzer , OUTPUT ); // declaring Buzzer pin as output pin
  pinMode ( flameSensor , INPUT );  // declaring sensor pin as input pin for Arduino
  pinMode ( ldr , INPUT );
  pinMode ( led , OUTPUT );
  pinMode ( rainSensor , INPUT );
}

void loop() {
  int light =analogRead(A0);
  int Read = digitalRead ( flameSensor ) ; // reading from the sensor
  int ldrRead = digitalRead ( ldr ) ;
  int rainRead= digitalRead ( rainSensor ) ;
   if (light <150){
    digitalWrite ( led , HIGH ) ;// if state is high, then turn high the Buzzer
  }
  else{
    digitalWrite ( led , LOW ) ; // otherwise turn it low
  }
  if (Read == LOW ){
  
    digitalWrite ( flameBuzzer , HIGH ) ;// if state is high, then turn high the Buzzer
  }
  else{
    digitalWrite ( flameBuzzer , LOW ) ; // otherwise turn it low
  }
  if (rainRead == LOW ){
    Serial.println("Digital value : wet"); 
     rainServo.write(180);       
  }
  else{
    Serial.println("Digital value :dry"); 
    rainServo.write(90);  
  }
  
}
