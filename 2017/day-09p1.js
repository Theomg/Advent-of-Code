const inputArr = [...input];

let score = 0;
let groupVal = 1;
let ignoring = false;
for(let i = 0;i < input.length;i++){
    const char = inputArr[i];
    if(char === '!'){
        inputArr[i+1] = 'a';
    }
    else if(ignoring){
        if(char === '>'){
            ignoring = false;
        }
        continue;
    }
    else if(char === '<'){
        ignoring = true;
    }
    else if(char === '{'){
        score += groupVal;
        groupVal++;
    }
    else if(char === '}'){
        groupVal--;
    }
}
console.log(score);