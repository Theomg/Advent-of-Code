const input = 
``;

const lines = input.split('\n');

const connections = new Map();
lines.forEach(line => {
  const [prog, coms] = line.split(' <-> ');
  const comArr = coms.split(', ');
  connections.set(prog, comArr);
});

const found = new Set();
const targets = ['0'];
while(targets.length > 0){
  const target = targets.pop();
  if(found.has(target)){
    continue;
  }
  found.add(target);
  const nextTargets = connections.get(target);
  targets.push(...nextTargets);
}
console.log(found.size);
