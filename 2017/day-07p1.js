class Node{
  constructor(name, children){
    this.name = name;
    this.children = children;
    this.hasParent = false;
  }
}

const lines = input.split('\n');
const nodes = lines.map(line => {
  const nodeName = line.match(/^(.+?)\s/)[1];
  const children = [];
  if(line.includes('->')){
    const childrenNames = line.match(/->(.+?)$/)[1]
                              .trim()
                              .split(', ');
    children.push(...childrenNames);
  }
  return new Node(nodeName, children);
});
nodes.filter(node => node.children.length > 0)
      .forEach(node => {
        node.children.forEach((child) => {  
          const childNode = nodes.find((node) => node.name === child);
          childNode.hasParent = true;
        });
      });
const base = nodes.filter(node => !node.hasParent)[0];
