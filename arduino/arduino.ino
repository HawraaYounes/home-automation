int flameBuzzer=4;
int flameSensor=8;
void setup() {
pinMode ( flameBuzzer , OUTPUT ); // declaring Buzzer pin as output pin
pinMode ( flameSensor , INPUT );  // declaring sensor pin as input pin for Arduino
}

void loop() {
 int Read = digitalRead ( flameSensor ) ; // reading from the sensor
  if (Read == LOW ){
  digitalWrite ( flameBuzzer , HIGH ) ;// if state is high, then turn high the Buzzer
  }
  else{
  digitalWrite ( flameBuzzer , LOW ) ; // otherwise turn it low
  }
}
