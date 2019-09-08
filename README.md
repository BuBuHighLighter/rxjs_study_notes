# RxJs学习笔记

## 安装
```bash
npm install rxjs
```

## 知识点
1.Observable
2.Observer

## Observer
观察者（Observer）是一个有三个方法的对象
|方法名|作用|
|-|-|
|next|当Observable 发出新的值时被调用，接收这个值作为参数|
|complete|当 Observable 完结，没有更多数据时被调用。**complete 之后，next 方法无效**|
|error|当 Observable 内部发生错误时被调用，之后不会调用 complete，next 方法无效|

**例子**
```js
const source = new Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.complete();
    observer.next(3);
})

const observer = {
    next: function(number: any) {
        console.log(number)
    },
    complete: function() {
        console.log('complete');
    }
}

console.log('start');
source.subscribe(observer);
console.log('end');
```
上面的代码会输出1、2、complete,不会输出3。因为在complete()处就已经结束了。

**简写**
Observer还有简单形式，即不用构造一个对象，而是直接把函数作为subscribe的参数传入。参数依次为
1.next
2.error
3.complete
```js
source.subscribe(
    (item:any) => {
        console.log(item);
    },
    (err) => {
        console.log(err);
    },
    () => {
        console.log('complete');
    }
)
```