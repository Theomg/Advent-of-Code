function* gen(start, factor, divisor){
  let last = start;
  while(true){
    let next;
    do{
      next = (last * factor) % 2147483647;
      last = next;
    }while(next % divisor !== 0);
    yield next;
  }
}

const genA = gen(65,  16807, 4);
const genB = gen(8921,48271, 8);

const lowestMask = 0xFFFF;
let counter = 0;
for(let i = 0;i < 5000000;i++){
  const valA = genA.next().value & lowestMask;
  const valB = genB.next().value & lowestMask;
  if(valA === valB){
    counter++;
  }
}
console.log(counter);