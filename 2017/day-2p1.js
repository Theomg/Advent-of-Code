const lines = input
    .split('\n')
    .map(l =>
        l
        .split('\t')
        .map(Number)
    );

const mins = lines.map(l => Math.min(...l));

const maxs = lines.map(l => Math.max(...l));

const sumDiff = maxs.reduce(
    (res, lMax, idx) => res + lMax - mins[idx],
    0
);