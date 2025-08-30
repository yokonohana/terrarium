function getStr(str) {
  return str.toLowerCase().replace(/[^a-z]/, '');
}

console.log(getStr('A man, a plan, a canal: Panama'));