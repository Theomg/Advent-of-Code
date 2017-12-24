const input = 
`0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`;

const components = input.split('\n');

class Node{
    constructor(val){
        this.val = val;
        this.children = [];
    }
}

const root = new Node('0/0');
let maxStr = 0;

function buildBridges(curNode, curComponents, curPort = '0', curStr = 0){
    const availableComponents = curComponents.filter(c => {
        const ports = c.split('/');
        return ports[0] === curPort || ports[1] === curPort;
    });
    if(availableComponents.length === 0){
        if(maxStr < curStr){
            maxStr = curStr;
        }
        return;
    }
    availableComponents.forEach(c => {
        const curPorts = c.split('/');
        const usedPortIdx = curPorts.indexOf(curPort);
        const nextPort = curPorts.filter( (p, i) => i !== usedPortIdx)[0];
        const node = new Node(c);
        curNode.children.push(node);
        const nextComponents = curComponents.filter(comp => comp !== c);
        const nextStr = curStr + +curPorts[0] + +curPorts[1];
        buildBridges(node, nextComponents, nextPort, nextStr);
    });
}

buildBridges(root, components);
console.log(maxStr);