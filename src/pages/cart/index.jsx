import React, {Component} from 'react';

class Cart extends Component{

  componentDidMount(){
    let arr = [{name: "aaa",age:"18",sex:"1"},{name: "bbb",age:"19",sex:"0"},{name: "ccc",age:"20",sex:"1"}];
    arr.forEach((item,index,arr)=>{
      console.log(item)
    })

    var arr1 = [1, 2, 3, 4, 5];

    arr1.every(function (item) {
            console.log(item);
            return item !== 3;
    });

    var fruits = ["Banana", "Orange", "Apple", "Mango"];
    fruits.keys();
    console.log(fruits,fruits.keys())
    var numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,22,20,23,24];
    let num = numbers.reduce(function(prev, cur, index, arr){
      return prev+cur;
    })
    console.log(num)

    // Object.keys()  返回一个所有元素为字符串的数组
    // Object.values()  返回一个给定对象自身的所有可枚举属性值的数组
    // console.log(Object.keys(arr))
    // console.log(Object.keys(arr1))
    // var obj = { 'a1': 'a', 'b1': 'b', 'c1': 'c' };
    // console.log(Object.keys(obj))
    // console.log(Object.values(arr))
    // console.log(Object.values(arr1))
    // console.log(Object.values(obj))
    // function Date(n){
    //   return ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][n%7 || 0];
    // }
    // function runCodeWithDateFunction(obj){
    //     return Function('"use strict";return (' + obj + ')')()(
    //         Date
    //     );
    // }
    // console.log(runCodeWithDateFunction(
    //   "function(Date){ return Date(5) }"
    // ))

    // console.log(eval(new String('2+2+2+2+2+2+2+100')))
    // console.log(eval('2*2*2'))

    let str = "123qweqe阿斯蒂芬撒";
    console.log(encodeURIComponent(str))
    let str1 = encodeURIComponent(str)
    console.log(decodeURIComponent(str1))
    console.log(Math.E,Math.LN2,Math.LN10,Math.LOG2E,Math.PI)
    console.log(Math.abs(-1234),Math.acos(12),Math.floor(12.9),Math.fround(1.435345))
    console.log(Math.round(Math.random()*100))
    // Math.round() 函数返回一个数字四舍五入后最接近的整数
    // Math.random() 随机数0-1（不包括1）
    const date2 = new Date('1995-12-17T03:24:00');
    console.log(date2)
    
  }


  render(){
    return(
      <div>ssdfsfsfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf</div>
    )
  }
}

export default Cart;