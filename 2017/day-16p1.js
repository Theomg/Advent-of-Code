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

const input = `s1,x3/4,pe/b`;
const instructions = input.split(',');

instructions.forEach(inst => {
    const move = inst[0];
    const [a, b] = inst.slice(1).split('/');
    moves[move](a, b);
});
const order = programs.join('');
