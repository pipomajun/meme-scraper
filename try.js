let progressBar = '[...........]';

for (let i = 0; i < progressBar.length; i++) {
  progressBar = progressBar[i].replaceAt('.', 'X');
  console.log(progressBar[i]);
}

console.log(progressBar.length);
// for (let i = 0; i < progressBar.length; i++) {
//   progressBar[i] = progressBar[i].replace('.', 'X');
//   process.stdout.write(`\r${progressBar[i]}`);
// }
// process.stdout.write(`\r[${dash}${empty}] ${i * 2}%`);
// process.stdout.write(`\r ${progressBar[i]}`);
