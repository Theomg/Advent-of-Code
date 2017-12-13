const passphrases = input.split('\n');

const validCount = passphrases.reduce((total, pass) => {
  const words = pass.split(' ');
  const wordCount = words.length;
  const orderedWords = words.map(word => [...word].sort().join());
  const set = new Set(orderedWords);
  if(set.size === wordCount){
    return total + 1;
  }
  return total;
}, 0);