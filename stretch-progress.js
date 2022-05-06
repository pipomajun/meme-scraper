function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function main() {
  for (let i = 0; i <= 50; i++) {
    const dash = '='.repeat(i);
    const left = 50 - i;
    const empty = ' '.repeat(left);

    // use process.stdout.write to write on same command line - console.log() prints on new line
    // use \r at beginning to clear line before rewriting it with the next iteration
    process.stdout.write(`\r[${dash}${empty}] ${i * 2}%`);
    await wait(Math.round(Math.random() * 500));
  }
}

main().catch((err) => console.log(err));
