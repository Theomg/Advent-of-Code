const states = {
    'A': () => {
        const val = getVal(cursor);
        if(val === 0){
            vals.set(cursor, 1);
            cursor++;
            state = 'B';
        }
        else{
            vals.set(cursor, 0);
            cursor--;
            state = 'C';
        }
    },
    'B': () => {
        const val = getVal(cursor);
        if(val === 0){
            vals.set(cursor, 1);
            cursor--;
            state = 'A';
        }
        else{
            vals.set(cursor, 1);
            cursor++;
            state = 'C';
        }
    },
    'C': () => {
        const val = getVal(cursor);
        if(val === 0){
            vals.set(cursor, 1);
            cursor++;
            state = 'A';
        }
        else{
            vals.set(cursor, 0);
            cursor--;
            state = 'D';
        }
    },
    'D': () => {
        const val = getVal(cursor);
        if(val === 0){
            vals.set(cursor, 1);
            cursor--;
            state = 'E';
        }
        else{
            vals.set(cursor, 1);
            cursor--;
            state = 'C';
        }
    },
    'E': () => {
        const val = getVal(cursor);
        if(val === 0){
            vals.set(cursor, 1);
            cursor++;
            state = 'F';
        }
        else{
            vals.set(cursor, 1);
            cursor++;
            state = 'A';
        }
    },
    'F': () => {
        const val = getVal(cursor);
        if(val === 0){
            vals.set(cursor, 1);
            cursor++;
            state = 'A';
        }
        else{
            vals.set(cursor, 1);
            cursor++;
            state = 'E';
        }
    },
}

const vals = new Map([[0, 0]]);
let cursor = 0;
let state = 'A';

const getVal = (pos) => {
    let val = vals.get(pos);
    if(val === undefined){
        vals.set(pos, 0);
        return 0;
    }
    return val;
}

const steps = 12134527;
for(let i = 0;i < steps;i++){
    states[state]();
}

const values = [...vals.values()];
const sum = values.reduce((s, v) => s + v, 0);