const input =
`p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>
p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>`;

class Vec3{
  constructor(x = 0, y = 0, z = 0){
    this.x = +x;
    this.y = +y;
    this.z = +z;
  }

  set(x, y, z){
    this.x = +x;
    this.y = +y;
    this.z = +z;
  }

  equals(vec){
    return this.x === vec.x && this.y === vec.y && this.z === vec.z;
  }

  manhattanDist(){
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
}

class Particle{
  constructor(id){
    this.id = id;
    this.pos = new Vec3();
    this.vel = new Vec3();
    this.acc = new Vec3();
  }

  fromString(partString){
    const pos = partString.match(/p=<(.+?)>/)[1];
    const vel = partString.match(/v=<(.+?)>/)[1];
    const acc = partString.match(/a=<(.+?)>/)[1];

    const posComps = pos.trim().split(',');
    this.pos.set(...posComps);

    const velComps = vel.trim().split(',');
    this.vel.set(...velComps);

    const accComps = acc.trim().split(',');
    this.acc.set(...accComps);
  }
}

const partLines = input.split('\n');
const particles = [];
partLines.forEach((ln, idx) => {
  const particle = new Particle(idx);
  particle.fromString(ln);
  particles.push(particle);
  const particleDist = particle.pos.manhattanDist();
});

particles.sort((a, b) => a.acc.manhattanDist() - b.acc.manhattanDist());
const minAcc = particles[0].acc;
const equalAcc = particles.filter(p => p.acc.equals(minAcc));

equalAcc.sort((a, b) => a.vel.manhattanDist() - b.vel.manhattanDist());
const minVel = equalAcc[0].vel;
const equalVel = equalAcc.filter(p => p.vel.equals(minVel));

equalVel.sort((a, b) => a.pos.manhattanDist() - b.pos.manhattanDist());
const minPos = equalVel[0].pos;
const equalPos = equalVel.filter(p => p.pos.equals(minPos));

const minId = equalPos.pop().id;
