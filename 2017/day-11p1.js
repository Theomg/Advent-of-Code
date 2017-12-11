const input = '';

const dirs = input.split(',');

const pos = {'x': 0, 'y': 0, 'z': 0};

const moves = {
  'n' : (v) => { v.y++; v.z--;},
  'ne': (v) => { v.x++; v.z--;},
  'se': (v) => { v.x++; v.y--;},
  's' : (v) => { v.z++; v.y--;},
  'sw': (v) => { v.z++; v.x--;},
  'nw': (v) => { v.y++; v.x--;},
};

dirs.forEach(dir => {
  moves[dir](pos);
});

const maxDist = Math.max(Math.abs(pos.x),
                         Math.abs(pos.y),
                         Math.abs(pos.z));
