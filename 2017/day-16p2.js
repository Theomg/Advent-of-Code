let programs = new Array(16)
                    .fill(0)
                    .map((p, i) => String.fromCharCode(97 + i));
const moves = {
    s: (n) => {
        const beg = programs.splice(-n);
        programs = [...beg, ...programs];
    },
    x: (a, b) => {
        [programs[+a], programs[+b]] = [programs[+b], programs[+a]];
    },
    p: (a, b) => {
        const aIdx = programs.indexOf(a);
        const bIdx = programs.indexOf(b);
        moves.x(aIdx, bIdx);
    }
}

const dance = (instructions) => {
    instructions.forEach(inst => {
        const move = inst[0];
        const [a, b] = inst.slice(1).split('/');
        moves[move](a, b);
    });
}

const input = `s1,x3/4,pe/b`;
const inputMoves = input.split(',');

const initial = Array.from(programs);
const results = new Set();
let counter = -1;
let curOrder;

do {
    results.add(curOrder);
    counter++;
    dance(inputMoves);
    curOrder = programs.join('');
} while (!results.has(curOrder));

const extraIters = 1e9 % counter;
programs = initial;

for (let i = 0; i < extraIters; i++) {
    dance(inputMoves);
}
const order = programs.join('');