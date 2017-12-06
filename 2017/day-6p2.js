let banks = input.split('\t').map(Number);
let configs = new Set();
let loopFound = false;
let count = 0;

while(!configs.has(banks.toString()) || !loopFound){
  configs.add(banks.toString());
  let {val, curIdx} = banks
                        .reduce((max, val, i) => (val > max.val) ? {val: val, curIdx: i} : max,
                        {val: -Infinity});
  const banksLen = banks.length;
  banks[curIdx] = 0;
  while(val > 0) {
    curIdx = (curIdx + 1) % banksLen;
    banks[curIdx]++;
    val--;
  }
  if(loopFound){
    count++;
  }
  if(configs.has(banks.toString()) && !loopFound){
    loopFound = true;
    configs = new Set();
  }
}
