const input = 
``;

const inputVals = input.split('\n').map(l => l.split(': ').map(Number));
const max = inputVals[inputVals.length - 1][0] + 1;
const vals = new Array(max);
for(let i = 0;i < max;i++){
  vals[i] = inputVals.filter(v => v[0] === i)[0] || 0;
}
let delay = -1;
let caught;
do{
  delay++;
  caught = false;
  for(let i = 0;i < max;i++){
    const val = vals[i];
    if(val === 0){
      continue;
    }
    const col = (i + delay) % (val[1] * 2 - 2) === 0;
    if(col){
      caught = true;
      break;
    }
  }
}while(caught);

console.log(delay);

