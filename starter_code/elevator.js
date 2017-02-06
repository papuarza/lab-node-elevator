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
      if (this.floor < this.destinations[0]){
        this.floorUp();
        if (this.requests.length > 0){
          for (let i = this.passengers.length-1; i<this.requests.length;i++){
            if(this.floor === this.requests[i] && this.floor < this.destinations[i+1]){
              this._passengersEnter();
              if (this.destinations[i+1] < this.destinations[0]){
                // let requestAux = this.requests[0];
                let destinationAux = this.destinations[0];
                let passengerAux = this.passengers[0];
                // this.requests[0] = this.requests[1];
                this.destinations [0] = this.destinations[1];
                this.passengers [0] = this.passengers[1];
                // this.requests.splice(1,1,requestAux);
                this.destinations.splice(1,1, destinationAux);
                this.passengers.splice(1,1,passengerAux);
              }
            }
          }
        }
      } else if (this.floor > this.destinations[0]) {
        this.floorDown();
        if (this.requests.length > 0){
          for (let i = this.passengers.length-1; i<this.requests.length;i++){
            if(this.floor === this.requests[i] && this.floor > this.destinations[i+1]){
              this._passengersEnter();
              if (this.destinations[i+1] > this.destinations[0]){
                // let requestAux = this.requests[0];
                let destinationAux = this.destinations[0];
                let passengerAux = this.passengers[0];
                // this.requests[0] = this.requests[1];
                this.destinations [0] = this.destinations[1];
                this.passengers [0] = this.passengers[1];
                // this.requests.splice(1,1,requestAux);
                this.destinations.splice(1,1, destinationAux);
                this.passengers.splice(1,1,passengerAux);
              }
            }
          }
        }
      } else {
        this._passengersLeave();
        this.destinations.splice(0,1);
      }
    } else {
      if (this.floor < this.requests[0]){
        this.floorUp();
      } else if (this.floor > this.requests[0]) {
        this.floorDown();
      } else {
        this._passengersEnter();
      }
    }

    this.log();
  }

  _passengersEnter() {
      this.passengers.push(this.waitingList[0]);
      this.waitingList.splice(0,1);
      this.requests.splice(0,1);
  }

  _passengersLeave() {
      this.servedPassengers.push(this.passengers.splice(0,1));
  }

  floorUp() {
    if(this.floor<this.MAXFLOOR) { this.floor +=1; this.direction="Up";}
  }

  floorDown() {
    if(this.floor>0) { this.floor -=1; this.direction="Down";}
  }

  call(person) {
    this.requests.push(person.originFloor);
    this.destinations.push(person.destinationFloor);
    this.waitingList.push(person.name);
  }

  log() {
    console.log("Direction: "+this.direction+" || Floor: "+ this.floor);
    console.log("Personas en espera: "+this.waitingList+" || Recogerlas de los pisos: "+this.requests+" || Llevarlas al piso: "+ this.destinations);
    console.log("Los pasajeros en el ascensor son: "+this.passengers);
    console.log("Los pasajeros depositados en destino son: "+this.servedPassengers+"\n");
  }
}
module.exports = Elevator;
