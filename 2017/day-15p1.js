function* gen(start, factor){
  let last = start;
  while(true){
    const next = (last * factor) % 2147483647;
    last = next;
    yield next;
  }
}

const genA = gen(65,   16807);
const genB = gen(8921, 48271);

const lowestMask = 0xFFFF;
let counter = 0;
for(let i = 0;i < 40000000;i++){
  const valA = genA.next().value & lowestMask;
  const valB = genB.next().value & lowestMask;
  if(valA === valB){
    counter++;
  }
}
console.log(counter);