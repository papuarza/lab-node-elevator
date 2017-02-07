/*jshint esversion: 6*/
class Person {
  constructor(name, originFloor, destinationFloor, direction){
    this.name = name;
    this.originFloor = originFloor;
    this.destinationFloor = destinationFloor;
    this.direction = direction;
  }
}

module.exports = Person;
