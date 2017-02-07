const _ = require('lodash');
const Elevator = require('./elevator.js');
const Person = require('./person.js');
const elevador = new Elevator();
const victor = new Person("Victor", 2, 9, "Up");
const pepe = new Person("Pepe", 4, 8, "Up");
const maria = new Person("Maria", 0, 8, "Up");
const suazo = new Person("Suazo", 5, 1, "Down");
const julia = new Person("Julia", 3, 6, "Up");

elevador.start();
elevador.call(victor);
elevador.call(pepe);
// elevador.call(maria);
elevador.call(suazo);
elevador.call(julia);

let myVar = setTimeout(() => elevador.call(maria),3000);
