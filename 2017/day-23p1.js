const input = 
`set b 99
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23`;

const lines = input.split('\n');
const initReg = 'abcdefgh'
                .split('')
                .map(r => [r, 0]);

const operations = {
  set: (x, y) => { y = getValue(y); registers.set(x, y); },
  sub: (x, y) => { y = getValue(y); registers.set(x, registers.get(x) - y); },
  mul: (x, y) => { 
      mulCount++;
      y = getValue(y);
      registers.set(x, registers.get(x) * y); },
  jnz: (x, y) => {
    x = getValue(x);
    y = getValue(y);
    if(x === 0) return;
    curLn += y - 1;
  },
};

function getValue(n){
  if(registers.has(n)){
    return registers.get(n);
  }
  return +n;
}

let curLn = 0;
let done = false;

const registers = new Map(initReg);

let mulCount = 0;

while(lines[curLn] !== undefined){
  const [op, x, y] = lines[curLn].split(' ');
  operations[op](x, y);
  curLn++;
}

console.log(mulCount);