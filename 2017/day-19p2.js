const input = 
`
     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ 
`;
const lines = input;
const map = lines.split('\n')
                .filter(ln => ln !== '')
                .map(l => l.split(''));

let pos;
let dir = [0, 1];
for(let i = 0; i < map[0].length;i++){
  if(map[0][i] === '|'){
    pos = [i, 0];
    break;
  }
}

let directions = [    [0, -1],
                  [-1, 0], [1, 0],
                      [0,  1]
                 ];
let validChars = [    '|',
                  '-',   '-',
                      '|'
                 ];

let mapChar;
let steps = -1;
do{
  [x, y] = pos;
  mapChar = map[y] && map[y][x];
  if(mapChar === '+'){
    for(let i = 0;i < directions.length;i++){
      if(directions[i][0] === -dir[0] && directions[i][1] === -dir[1]
      || directions[i][0] ===  dir[0] && directions[i][1] ===  dir[1]){
        continue;
      }
      const pDir = directions[i];
      const [pX, pY] = [pos[0] + pDir[0], pos[1] + pDir[1]];
      const validChar = validChars[i];
      possibleChar = map[pY] && map[pY][pX];
      if(possibleChar === validChar || /[A-Z]/.test(possibleChar)){
        dir = pDir;
        break;
      }
    }
  }
  pos = [x + dir[0], y + dir[1]];
  steps++;
}while(mapChar !== undefined && !/\s/.test(mapChar));
console.log(steps);
