const input = 
`set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`;

const lines = input.split('\n');
const initReg = lines.map(l => l.split(' ')[1])
                     .filter(r => r.match(/[a-z]/))
                     .map(r => [r, 0]);

const operations = {
  snd: (x) => { lastPlayed = getValue(x); },
  set: (x, y) => { y = getValue(y); registers.set(x, y); },
  add: (x, y) => { y = getValue(y); registers.set(x, registers.get(x) + y); },
  mul: (x, y) => { y = getValue(y); registers.set(x, registers.get(x) * y); },
  mod: (x, y) => { y = getValue(y); registers.set(x, registers.get(x) % y); },
  rcv: (x) => {
    x = registers.get(x);
    if(x === 0) return;
    x = lastPlayed;
    done = true;
  },
  jgz: (x, y) => {
    x = getValue(x);
    y = getValue(y);
    if(x <= 0) return;
    curLn += y - 1;
  },
};

function getValue(n){
  if(registers.has(n)){
    return registers.get(n);
  }
  return +n;
}

let lastPlayed = null;
let curLn = 0;
let done = false;

const registers = new Map(initReg);

while(!done){
  const [op, x, y] = lines[curLn].split(' ');
  operations[op](x, y);
  curLn++;
}

console.log(lastPlayed);