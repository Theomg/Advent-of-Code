const inputArr = [...input].map(Number);
const res = inputArr
            .reduce((sum, num, idx, arr) => {
                const circIdx = (idx + 1) % arr.length;
                return (num === arr[circIdx]) ? sum + num : sum;
            }, 0);