const inputArr = [...input].map(Number);
const halfSize = input.length/2;
const res = inputArr
            .reduce((sum, num, idx, arr) => {
                const circIdx = (idx + halfSize) % arr.length;
                return (num === arr[circIdx]) ? sum + num : sum;
            }, 0);