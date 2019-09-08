import {Observable} from 'rxjs';

const source = new Observable(observer => {
    let number = 1;
    setInterval(() => {
        observer.next(number++);
    }, 1000)
})

const observer = {
    next : function(item:any) {
        console.log(item)
    }
}

console.log('start1');

source.subscribe(observer);

console.log('start2');