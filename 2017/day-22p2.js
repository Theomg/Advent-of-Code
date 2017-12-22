const input = 
`..#
#..
...`;

const cells = new Map();

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
      cells.set(pos.toString(), 'i');
    }
  }
}

let infections = 0;
const bursts = 10000000;
for(let i = 0;i < bursts;i++){
  const curPosStr = curPos.toString();
  const state = cells.get(curPosStr);
  switch(state){
    case undefined:
      curDir = [~~curDir[1], ~~-curDir[0]];
      cells.set(curPosStr, 'w');
      break;
    case 'w':
      cells.set(curPosStr, 'i');
      infections++;
      break;
    case 'i':
      curDir = [~~-curDir[1], ~~curDir[0]];
      cells.set(curPosStr, 'f');
      break;
    case 'f':
      curDir = [~~-curDir[0], ~~-curDir[1]];
      cells.delete(curPosStr);
      break;
  }
  curPos = [curPos[0] + curDir[0],
            curPos[1] + curDir[1]];
}
console.log(infections);
