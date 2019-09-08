"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const source = new rxjs_1.Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.next(4);
});
const observer = {
    next: function (item) {
        console.log(item);
    }
};
console.log('start0');
source.subscribe(observer);
console.log('start1');
