const input = 
`set b 99
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23`;

// The code below is the equivalent to the assembly above, when register a starts as 1
const isPrime = (n) =>{
  const max = Math.sqrt(n);
  for(var i = 2; i < max; i++){
      if(n % i === 0){
          return false;
      }
  }
  return true;
}

let h = 0;
for(let b = 109900;b <= 126900;b += 17){
    if(!isPrime(b)){
        h++;
    }
}
console.log(h);