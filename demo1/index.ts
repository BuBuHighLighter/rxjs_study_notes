import {Observable} from 'rxjs';

const source = new Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3)
    observer.next(4)
    observer.next(4)

})

const observer = {
    next:function (item:any){
        console.log(item);
    } 
}
console.log('start0');

source.subscribe(observer)

console.log('start1');