const sum = (a, b) => a + b;
//console.log(sum(50, 60));

const n1 = parseInt(process.argv[2]);
const n2 = parseInt(process.argv[3]);
console.log(sum(n1, n2));  //+n1, +n2