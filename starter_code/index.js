/*jshint esversion: 6*/
const Elevator = require('./elevator.js');
const Person = require('./person.js');
const elevador = new Elevator();
const victor = new Person("Victor", 2, 9);
const pepe = new Person("Pepe", 4, 8);
const maria = new Person("Maria", 0, 8);
const suazo = new Person("Suazo", 5, 1);
const person5 = new Person("Victor", 0, 4);
const person6 = new Person("Victor", 0, 4);
const person7 = new Person("Victor", 0, 4);
const person8 = new Person("Victor", 0, 4);
const person9 = new Person("Victor", 0, 4);
const person10 = new Person("Victor", 0, 4);
const person11 = new Person("Victor", 0, 4);

elevador.start();
elevador.call(victor);
elevador.call(pepe);
// elevador.call(maria);
elevador.call(suazo);

let myVar = setTimeout(() => elevador.call(maria),3000);
