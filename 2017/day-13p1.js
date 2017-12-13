const input = 
``;

const vals = input.split('\n').map(l => l.split(': ').map(Number));

const max = vals[vals.length - 1][0] + 1;

let severity = 0;
for(let i = 0;i < max;i++){
  const val = vals.filter(v => v[0] === i)[0] || 0;
  if(val === 0){
    continue;
  }
  const col = i % (val[1] * 2 - 2) === 0;
  if(col){
    severity += val[0] * val[1];
  }
}
console.log(severity);