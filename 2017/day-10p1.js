const input = '';
const listLen = 256;

const lengths = input.split(',').map(Number);
const list = new Array(listLen)
                .fill(0)
                .map((n, idx) => idx);
let curPos = 0;
let skip = 0;

lengths.forEach(length => {
    let min = curPos;
    let max = curPos + length - 1;
    while(min < max){
        [list[min % listLen], list[max % listLen]] = [list[max % listLen], list[min % listLen]];
        min++;
        max--;
    }
    curPos = (curPos + length + skip) % listLen;
    skip++;
});
const hash = list[0] * list[1];