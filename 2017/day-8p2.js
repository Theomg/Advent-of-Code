const lines = input.split('\n');

const registerNames = lines.map(line => line.split(' ')[0]);
const registers = new Map(registerNames.map(register => [register, 0]));

const comparisons = {
  '>': (a, b) => a > b,
  '>=': (a, b) => a >= b,
  '<': (a, b) => a < b,
  '<=': (a, b) => a <= b,
  '==': (a, b) => a === b,
  '!=': (a, b) => a !== b,
};

const operations = {
  'dec': (a, b) => a - b,
  'inc': (a, b) => a + b,
}

let largestVal = 0;

lines.forEach(line => {
  const [op, cond] = line.split(' if ');
  const [condReg, condComp, condVal] = cond.split(' ');
  const shouldOp = comparisons[condComp](registers.get(condReg), +condVal);
  if(shouldOp){
    const [opReg, operation, opVal] = op.split(' ');
    const val = operations[operation](registers.get(opReg), +opVal);
    if(val > largestVal){
      largestVal = val;
    }
    registers.set(opReg, val);
  }
});
