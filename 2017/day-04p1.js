const passphrases = input.split('\n');

const validCount = passphrases.reduce((total, pass) => {
  const words = pass.split(' ');
  const wordCount = words.length;
  const set = new Set(words);
  if(set.size === wordCount){
    return total + 1;
  }
  return total;
}, 0);