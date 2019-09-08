"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const source = new rxjs_1.Observable(observer => {
    let number = 1;
    setInterval(() => {
        observer.next(number++);
    }, 1000);
});
const observer = {
    next: function (item) {
        console.log(item);
    }
};
console.log('start1');
source.subscribe(observer);
console.log('start2');
