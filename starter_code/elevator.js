/*jshint esversion: 6*/

class Elevator {
  constructor(){
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = [];
    this.destinations = [];
    this.direction  = "Up";
    this.waitingList = [];
    this.passengers = [];
    this.servedPassengers = [];
  }

  start() {
   this.timer = setInterval(() => this.update(), 1000);
  }

  stop() {
    clearIntervel(this.timer);
  }

  update() {
    if (this.passengers.length > 0){
      if (this.floor < this.passengers[0].destinationFloor){
        // _.orderBy(this.requests, ['originFloor'],['desc']);
        this.floorUp();
        this.passengers.forEach((elem, indexOf, arr) => {
          if(elem.destinationFloor === this.floor && elem.direction === this.direction){
            this._passengersLeave(indexOf);
          }
        });
        this.requests.forEach((elem, indexOf, arr) => {
          if(elem.originFloor === this.floor && elem.direction === this.direction){
           this._passengersEnter(indexOf);
          }
        });
      } else if (this.floor > this.passengers[0].destinationFloor) {
        this.floorDown();
        this.passengers.forEach((elem, indexOf, arr) => {
          if(elem.destinationFloor === this.floor && elem.direction === this.direction){
            this._passengersLeave(indexOf);
          }
        });
        this.requests.forEach((elem, indexOf, arr) => {
          if(elem.originFloor === this.floor && elem.direction === this.direction){
           this._passengersEnter(indexOf);
          }
        });
      }
    } else {
      if (this.requests.length > 0) {
        if (this.floor < this.requests[0].originFloor){
          this.floorUp();
        } else if (this.floor > this.requests[0].originFloor) {
          this.floorDown();
        } else {
          this._passengersEnter(0);
        }
      }
    }
    this.log();
  }

  _passengersEnter(indexOf) {
      this.passengers.push(this.requests[indexOf]);
      this.requests.splice(indexOf,1);
  }

  _passengersLeave(indexOf) {
      this.servedPassengers.push(this.passengers[indexOf]);
      this.passengers.splice(indexOf,1);
  }

  floorUp() {
    if(this.floor<this.MAXFLOOR) { this.floor +=1; this.direction="Up";}
  }

  floorDown() {
    if(this.floor>0) { this.floor -=1; this.direction="Down";}
  }

  call(person) {
    this.requests.push(person);
  }

  log() {
    console.log("Direction: "+this.direction+" || Floor: "+ this.floor);
    console.log("Personas en espera:");
    console.log(this.requests);
    console.log("Los pasajeros en el ascensor son:");
    console.log(this.passengers);
    console.log("Los pasajeros depositados en destino son: ");
    console.log(this.servedPassengers+"\n");
  }
}
module.exports = Elevator;
