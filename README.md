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

## 退订(unsubscribe)
观察者想要退订，只要调用订阅返回的对象的```unsubscribe```方法，这样观察者就不会再接收到Observable的信息了。
```js
const source = new Observable(observer => {
    let number = 1;
    setInterval( () => {
        observer.next(number++);
    }, 1000);
});

const observer = {
    next: function(item : any) => {
        console.log(item);
    }
}

const subscription = source.subscribe(observer);

setTimeout( () => {
    subscription.unsubscribe();         // 5s之后退订
}, 5000)
```

## 操作符
在RxJs中，操作符是用来处理数据流的。我们往往需要对数据流做一系列处理，才交给Observer，这时操作符就像一个管道一样，数据进入管道，完成处理，流出管道。

[实例代码](./demo3/index.ts)

```js
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
```
**interval操作符**
interval 操作符创造了一个数据流，interval(1000) 会产生一个每隔 1000 ms 就发出一个从 0 开始递增的数据。

**map操作符**
map 操作符和数组的 map 方法类似，可以对数据流进行处理。
这个 map 和数组的 map 方法会产生新的数组类似，它会产生新的 Observable。每一个操作符都会产生一个新的 Observable，不会对上游的 Observable 做任何修改，这完全符合函数式编程“数据不可变”的要求。

**pipe操作符**
pipe 方法就是数据管道，会对数据流进行处理，上面的例子只有一个 map 操作符进行处理，可以添加更多的操作符作为参数。
