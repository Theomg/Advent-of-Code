const inputArr = [...input];

let ignoring = false;
let garbageCount = 0;
for(let i = 0;i < input.length;i++){
    const char = inputArr[i];
    if(char === '!'){
        garbageCount-=1;
        inputArr[i+1] = 'a';
    }
    else if(ignoring){
        if(char === '>'){
            ignoring = false;
        }
        else{
            garbageCount++;
        }
        continue;
    }
    else if(char === '<'){
        ignoring = true;
    }
}
console.log(garbageCount);