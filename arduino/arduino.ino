int flameBuzzer=4;
int flameSensor=8;
int ldr=A0;
int led=7;
void setup() {
  Serial.begin(9600);
  pinMode ( flameBuzzer , OUTPUT ); // declaring Buzzer pin as output pin
  pinMode ( flameSensor , INPUT );  // declaring sensor pin as input pin for Arduino
  pinMode ( ldr , INPUT );
  pinMode ( led , OUTPUT );
}

void loop() {
  int light =analogRead(A0);
  int Read = digitalRead ( flameSensor ) ; // reading from the sensor
  int ldrRead = digitalRead ( ldr ) ;
   if (light <200 ){
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
  
}
