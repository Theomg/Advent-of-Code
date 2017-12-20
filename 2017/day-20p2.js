const input = 
`p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>
p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>
p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>
p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>`;

class Vec3{
  constructor(x = 0, y = 0, z = 0){
    this.x = +x;
    this.y = +y;
    this.z = +z;
  }

  add(vec){
    this.x += vec.x;
    this.y += vec.y;
    this.z += vec.z;
  }

  equals(vec){
    return this.x === vec.x && this.y === vec.y && this.z === vec.z;
  }

  set(x, y, z){
    this.x = +x;
    this.y = +y;
    this.z = +z;
  }
}

class Particle{
  constructor(){
    this.pos = new Vec3();
    this.vel = new Vec3();
    this.acc = new Vec3();
    this.active = true;
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

  update(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
}

const partLines = input.split('\n');
let particles = [];
partLines.forEach((ln, idx) => {
  const particle = new Particle();
  particle.fromString(ln);
  particles.push(particle);
});

const steps = 1000;

for(let step = 0; step < steps;step++){
  const partLen = particles.length;

  for(let i = 0;i < partLen;i++){
    for(let j = i + 1; j < partLen;j++){
      const partA = particles[i];
      const partB = particles[j];
      if(partA.pos.equals(partB.pos)){
        partA.active = false;
        partB.active = false;
      }
    }
  }

  particles = particles.filter(particle => particle.active);
  
  particles.forEach((p, idx) => {
    p.update();
  });
}

const particlesLeft = particles.length;