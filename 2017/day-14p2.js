const rows = new Array(128);
for(let r = 0;r < 128;r++){
  const input = `flqrgnkx-${r}`;
  const terminator = '17,31,73,47,23';
  const listLen = 256;
  
  const lengths = Array.from(input, c => c.charCodeAt(0));
  lengths.push(...terminator
          .split(',')
          .map(Number));
  const list = new Array(listLen)
                  .fill(0)
                  .map((n, idx) => idx);
  
  let curPos = 0;
  let skip = 0;
  
  for(let r = 0; r < 64;r++){
    lengths.forEach(length => {
      let min = curPos;
      let max = curPos + length - 1;
      while(min < max){
        [list[min % listLen], list[max % listLen]] = [list[max % listLen], list[min % listLen]];
        min++;
        max--;
      }
      curPos = (curPos + length + skip) % listLen;
      skip++;
    });
  }
  const denseHash = new Array(16);
  for(let i = 0;i < 16;i++){
      const sparsePart = list.filter((n, idx) => ~~(idx / 16) === i);
      const condensed = sparsePart.reduce((tot, n) => tot ^ n, 0);
      denseHash[i] = condensed;
  }
  const hash = denseHash.reduce((tot, num) => tot + num.toString(16).padStart(2, '0'), '');
  const bits = [...hash].map(c => parseInt(c, 16).toString(2).padStart(4, '0'));
  const bitString = bits.reduce((tot, hByte) => tot + hByte, '');
  rows[r] = bitString;
}

function fillRegion(x, y, val){
  regions[y][x] = val;
  [       
          [x, y - 1], 
   [x - 1, y],   [x + 1, y],
          [x, y + 1]
  ].forEach(([nx, ny]) => {
    nx = Math.max(0, Math.min(nx, 127));
    ny = Math.max(0, Math.min(ny, 127));
    if(regions[ny][nx] !== 0) return;
    if(rows[ny][nx] === '1'){
      fillRegion(nx, ny, val);
    }
  });
}

const regions = new Array(128);
for(let i = 0;i < 128;i++){
  regions[i] = new Array(128).fill(0);
}
let curRegion = 1;
for(let y = 0;y < 128;y++){
  for(let x = 0;x < 128;x++){
    if(regions[y][x] !== 0) continue;
    if(rows[y][x] === '1'){
      fillRegion(x, y, curRegion++);
    }
  }
}
console.log(curRegion - 1);
