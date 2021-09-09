let multi = ''
for (let i = 2; i <= 9; i++) {
  if (i !== 4) {
    for (let j = 2; j <= 5; j++) {
      multi += j + ' * ' + i + ' = ' + j * i + '\t' + '\t'
    }
    multi += '\n'
  }
}
multi += '\n'
for (let i = 2; i <= 9; i++) {
  if (i !== 4) {
    for (let j = 6; j <= 9; j++) {
      multi += j + ' * ' + i + ' = ' + j * i + '\t' + '\t'
    }
    multi += '\n'
  }
}
console.log(multi)