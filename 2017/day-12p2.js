const input = 
``;

const lines = input.split('\n');

const connections = new Map();
lines.forEach(line => {
  const [prog, coms] = line.split(' <-> ');
  const comArr = coms.split(', ');
  connections.set(prog, comArr);
});

let groups = 0;
let found = new Set();
const targets = ['0'];
while(connections.size > 0){
  while(targets.length > 0){
    const target = targets.pop();
    if(found.has(target)){
      continue;
    }
    found.add(target);
    const nextTargets = connections.get(target);
    targets.push(...nextTargets);
  }
  found.forEach(prog => connections.delete(prog));
  groups++;
  const connKeys = connections.keys();
  targets.push(connKeys.next().value);
}
console.log(groups);