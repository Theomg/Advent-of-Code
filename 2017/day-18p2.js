const input = 
`snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`;

const lines = input.split('\n');
const initReg = lines.map(l => l.split(' ')[1])
                     .filter(r => r.match(/[a-z]/))
                     .map(r => [r, 0]);
class Program{
  constructor(id){
    this.operations = {
      snd: (x) => { 
        this.sentCounter++;
        x = this.getValue(x);
        programs[(this.id + 1) % 2].addToQueue(x);
      },
      set: (x, y) => { y = this.getValue(y); this.registers.set(x, y); },
      add: (x, y) => { y = this.getValue(y); this.registers.set(x, this.registers.get(x) + y); },
      mul: (x, y) => { y = this.getValue(y); this.registers.set(x, this.registers.get(x) * y); },
      mod: (x, y) => { y = this.getValue(y); this.registers.set(x, this.registers.get(x) % y); },
      rcv: (x) => {
        if(this.queue.length === 0){
          this.isWaiting = true;
          return;
        }
        this.isWaiting = false;
        this.registers.set(x, this.queue.shift());
      },
      jgz: (x, y) => {
        x = this.getValue(x);
        y = this.getValue(y);
        if(x <= 0) return;
        this.curLn += y - 1;
      },
    };

    this.curLn = 0;
    this.registers = new Map(initReg);
    this.id = id;
    this.registers.set('p', id);
    this.isWaiting = false;
    this.isDone = false;
    this.queue = [];
    this.sentCounter = 0;
  }

  getValue(n){
    if(this.registers.has(n)){
      return this.registers.get(n);
    }
    return +n;
  }

  addToQueue(val){
    this.queue.push(val);
  }

  advance(){
    if(this.isDone) return;
    const [op, x, y] = lines[this.curLn].split(' ');
    this.operations[op](x, y);
    if(!this.isWaiting){
      this.curLn++;
      if(this.curLn >= lines.length){
        this.isDone = true;
      }
    }
  }
}

const programs = [new Program(0), new Program(1)];

function isDone(){
  return ((programs[0].isDone || programs[0].isWaiting) &&
          (programs[1].isDone || programs[1].isWaiting));
}

while(!isDone()){
  programs[0].advance();
  programs[1].advance();
}

console.log(programs[1].sentCounter);