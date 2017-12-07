class Node{
  constructor(name, weight, children){
    this.name = name;
    this.weight = +weight;
    this.children = children;
    this.parent = null;
  }

  checkTotalWeight(){
    if(this.children.length === 0){
      return this.weight;
    }
    const childrenWeights = this.children.map(child => ({
                                                          node: child,
                                                          totalWeight: child.checkTotalWeight()
                                                        }));
    const childrenSum = childrenWeights.reduce((sum, childWeight) => sum + childWeight.totalWeight, 0);
    const valueCounts = new Map();
    childrenWeights.forEach(childWeight => {
      const val = childWeight.totalWeight;
      if(valueCounts.has(val)){
        valueCounts.set(val, valueCounts.get(val) + 1);
      }
      else{
        valueCounts.set(val, 1);
      }
    });
    if([...valueCounts.keys()].length > 1){
      const numbers = [...valueCounts.entries()];
      const wrongWeight = numbers.find(num => num[1] === 1)[0];
      const rightWeight = numbers.find(num => num[1] !== 1)[0];
      const wrongNode = childrenWeights.find(childWeight => childWeight.totalWeight === wrongWeight).node;
      console.log(`The corrected weight is: ${rightWeight - wrongWeight + wrongNode.weight}`);
    }
    return childrenSum + this.weight;
  }
}

const lines = input.split('\n');
const nodes = lines.map(line => {
  const nodeName = line.match(/^(.+?)\s/)[1];
  const nodeWeight = line.match(/\((\d+?)\)/)[1];
  const children = [];
  if(line.includes('->')){
    const childrenNames = line.match(/->(.+?)$/)[1]
                              .trim()
                              .split(', ');
    children.push(...childrenNames);
  }
  return new Node(nodeName, nodeWeight, children);
});
nodes.filter(node => node.children.length > 0)
      .forEach(node => {
        const childLen = node.children.length;
        for(let i = childLen - 1;i >= 0;i--){    
          const childName = node.children[i];
          const childNode = nodes.find((node) => node.name === childName);
          node.children[i] = childNode;
          childNode.parent = node;
        }
      });
const base = nodes.filter(node => node.parent === null)[0];
base.checkTotalWeight();
