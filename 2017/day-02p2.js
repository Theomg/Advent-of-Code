const lines = input
    .split('\n')
    .map(l =>
        l
        .split('\t')
        .map(Number)
    );

const GetDivision = (arr) => {
    const arrLen = arr.length;
    for (let i = 0; i < arrLen; i++) {
        for (let j = 0; j < arrLen; j++) {
            if (i === j) continue;
            if (arr[i] % arr[j] === 0) {
                return arr[i] / arr[j];
            }
        }
    }
};

const divs = lines.map(GetDivision);

const sumDivs = divs.reduce(
    (res, val) => res + val,
    0
);