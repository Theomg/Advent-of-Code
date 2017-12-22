const input = 
`..#
#..
...`;

const infected = new Set();

const inputCells = input.split('\n').map(a => a.split(''));

const w = inputCells.length;
const midW = ~~(w/2);
const h = inputCells[0].length;
const midH = ~~(h/2);

let curPos = [0, 0];
let curDir = [0, -1];

for(let i = 0;i < inputCells.length;i++){
  for(let j = 0;j < inputCells[0].length;j++){
    if(inputCells[i][j] === '#'){
      const pos = [j - midH, i - midW];
      infected.add(pos.toString());
    }
  }
}

let infections = 0;
const bursts = 10000;
for(let i = 0;i < bursts;i++){
  const curPosStr = curPos.toString();
  if(infected.has(curPosStr)){
    curDir = [~~-curDir[1], ~~curDir[0]];
    infected.delete(curPosStr);
  } else{
    curDir = [~~curDir[1], ~~-curDir[0]];
    infected.add(curPosStr);
    infections++;
  }
  curPos = [curPos[0] + curDir[0],
            curPos[1] + curDir[1]];
}
console.log(infections);
