const inputArr = input.split('\n').map(Number);

function moveOut(inst){
  let curIdx = 0;
  let steps = 0;
  while(inst[curIdx] !== undefined){
    const val = inst[curIdx];
    inst[curIdx]++;
    curIdx += val;
    steps++;
  }
  return steps;
}
moveOut(inputArr);