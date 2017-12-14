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
const usedCount = rows.reduce((tot, row) => tot + [...row].filter(b => b === '1').length, 0);