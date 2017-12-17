const steps = 3;

const circ = [0];
let circSize = 1;
let curPos = 0;

for(let i = 1; i <= 2017;i++){
    curPos = 1 + ((curPos + steps) % circSize);
    circ.splice(curPos, 0, i);
    circSize++;
}

const nextVal = circ[curPos + 1];