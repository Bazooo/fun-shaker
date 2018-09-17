"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shaker_1 = require("./shaker");
exports.Shaker = shaker_1.Shaker;
const shaker_2 = require("./shaker");
const hello = () => {
    console.log(new Date().toLocaleTimeString());
};
const shaker = new shaker_2.Shaker();
shaker.add(hello, 'hello');
shaker.add(hello, 'darude');
console.log(shaker.getIndex('hello'));
shaker.startAutoshaker();
