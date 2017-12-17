const steps = 3;

let circSize = 1;
let curPos = 0;
let nextToZero;

for(let i = 1; i <= 50000000;i++){
    curPos = 1 + ((curPos + steps) % circSize);
    if(curPos === 1){
        nextToZero = i;
    }
    circSize++;
}

console.log(nextToZero);