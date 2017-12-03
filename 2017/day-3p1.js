const findClosestOddSqrt = (num) => {
    const sqrt = Math.sqrt(num);
    const ceil = Math.ceil(sqrt);
    return (ceil % 2 === 0) ? ceil + 1 : ceil;
};

const findDist = (input) => {
    const closestOddSqrt = findClosestOddSqrt(input);
    const closestOdd = closestOddSqrt * closestOddSqrt;
    
    const maxDist = closestOddSqrt - 1;
    if(maxDist === 0){
        return 0;
    }
    
    const distToSqrt = (closestOdd - input) % maxDist;
    
    const distNormalized = (distToSqrt > maxDist/2) ? distToSqrt - maxDist/2 : distToSqrt;
    
    return maxDist - distNormalized;
}