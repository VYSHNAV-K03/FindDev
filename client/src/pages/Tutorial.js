console.log(x); //output :undefined because x is initialised linebyline or phase 1 as undefined
getName();

var x = 7; //js has memory and code execution part
//x is first undefined in phase 1(memory part) and in phase 2 it is 7

function getName() {
  //by using arrow fn, it behaves as another variable not fn
  //using function it can access from anywhere
  //in phase 1 get name is initialised as the function {}
  console.log("helo");
}

console.log(x); //output :7  //second phase is x has value 7

console.log(getName);

// console.log(a); //it will show reference error , a is initialised as undefined inside script section not in global section

// let a = 10; //by using let it is not global ,use var

// let a =100;  //it shows syntax error but it is possible in two var

//const is more strict than let

{
  var a = 10;
  let b = 3;
  const c = 0;
}

console.log(a);
// console.log(b);   //it shows error becoz let and const cannot be get from block
// console.log(c);

//closures:-

function r() {
  var q = 10;
  function t() {
    console.log(q);
  }
  return t;
}

var z = r();

console.log(z); //it log t function

z(); //it log line 41

//reduce function--------->

const arr = [1, 2, 3, 7, 2];

// we want to find whole sum

const output = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
  }
  return sum;
};

console.log(output(arr));

//use reducer t0 find sum in below

console.log(
  arr.reduce((acc, curr) => {
    acc = acc + curr;
    return acc;
  }, 0) //0 is initial value of acc
);

const users = [
  {
    firstName: "sumesh",
    age: 26,
  },
  {
    firstName: "remseh",
    age: 50,
  },
  {
    firstName: "satheesh",
    age: 30,
  },
  {
    firstName: "hareesh",
    age: 26,
  },
  {
    firstName: "hasini",
    age: 50,
  },
];

//we want { 26:2 , 50:2 , 30:1 }

const ageReduce = users.reduce((acc, curr) => {
  if (acc[curr.age]) {
    acc[curr.age] = ++acc[curr.age];
  } else {
    acc[curr.age] = 1;
  }

  return acc;
}, {}); //initially acc is {}

console.log(ageReduce);

let acc = [];
console.log(
  users.reduce((acc, curr) => {
    if (curr.age < 31) {
      acc.push(curr.firstName);
    }
    return acc;
  }, [])
);

const date = new Date(
  "Thu Sep 29 2022 00:00:00 GMT+0530 (India Standard Time)"
);
console.log("date check", date);

const dateNew = new Date("2022-09-25" + "T11:34:00.000Z");
console.log(dateNew);

console.log(date - dateNew);
