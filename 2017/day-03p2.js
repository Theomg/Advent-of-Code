const calcNextSpiralValue = (input) => {
    const map = new Map();
    
    const horLimits = [-1, 1];
    const vertLimits = [-1, 1];
    
    let dir = [1, 0];
    
    let pos = [0, 0];
    let curValue;
    
    const matrix = [[-1, -1], [0, -1], [1, -1],
                    [-1,  0],          [1,  0],
                    [-1,  1], [0,  1], [1,  1]];
    
    const vecSum = (v1, v2) => [v1[0] + v2[0], v1[1] + v2[1]];
    const turnDir = (dir) => [~~dir[1], ~~-dir[0]];
    
    do{
        curValue = matrix.reduce((sum, dist) => {
            const neighborPos = vecSum(pos, dist).toString();
            const val = map.get(neighborPos) || 0;
            return sum + val;
        }, 0) || 1;

        map.set(pos.toString(), curValue);
        pos = vecSum(pos, dir);

        if(pos[0] === horLimits[1]){
            horLimits[1]++;
            dir = turnDir(dir);
        }
        else if(pos[0] === horLimits[0]){
            horLimits[0]--;
            dir = turnDir(dir);
        }
        else if(pos[1] === vertLimits[1]){
            vertLimits[1]++;
            dir = turnDir(dir);
        }
        else if(pos[1] === vertLimits[0]){
            vertLimits[0]--;
            dir = turnDir(dir);
        }
    } while(input >= curValue);

    return curValue;
};