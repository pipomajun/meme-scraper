// IMPORT DEPENDENCIES
import * as fs from 'node:fs';
import https from 'node:https';
import fetch from 'node-fetch';

// CHECK IF FOLDER EXISTS, IF NOT CREATE ONE
try {
  if (!fs.existsSync('./memes')) {
    fs.mkdirSync('./memes');
  }
} catch (err) {
  console.error(err);
}

// GET HTML AS STRING FROM URL
const response2 = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const html = await response2.text();

// PARSE HTML WITH REGEX AND RETURN ALL IMG URLS IN AN ARRAY
let i;
const imgUrls = [];
const rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

while ((i = rex.exec(html))) {
  imgUrls.push(i[1]);
}

// LOOP IT THROUGH EACH ITEMS IN ARRAY AND "SAVE" IT WITH THE CORRECT NAME
for (let j = 0; j < 10; j++) {
  // const dash = '='.repeat(j + 10);
  // const left = 10 - j;
  // const empty = ' '.repeat(left);
  const x = ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'];
  if (j < 9) {
    https
      .get(imgUrls[j], (res) => {
        const path = `./memes/0${j + 1}.jpg`;
        const stream = fs.createWriteStream(path);

        res.pipe(stream);

        stream.on('finish', () => {
          stream.close();
          //          console.log(`Image '0${j + 1}.jpg' downloaded`);
          process.stdout.write(x);
        });
      })
      .on('error', (err) => {
        // handle error
        console.log(err);
      });
  } else {
    https
      .get(imgUrls[j], (res) => {
        const path = `./memes/${j + 1}.jpg`;
        const stream = fs.createWriteStream(path);

        res.pipe(stream);

        stream.on('finish', () => {
          stream.close();
          //          console.log(`Image '10.jpg' downloaded`);
          process.stdout.write(x);
        });
      })
      .on('error', (err) => {
        // handle error
        console.log(err);
      });
  }
  // process.stdout.write(`\r[${dash}${empty}] ${j * 10}%`);
}
// function wait(ms) {
//   return new Promise((res) => setTimeout(res, ms));
// }

//   async function main() {
//     for (let i = 0; i <= 50; i++) {
//       const dash = '='.repeat(i);
//       const left = 50 - i;
//       const empty = ' '.repeat(left);

//       // use process.stdout.write to write on same command line - console.log() prints on new line
//       // use \r at beginning to clear line before rewriting it with the next iteration
//       process.stdout.write(`\r[${dash}${empty}] ${i * 2}%`);
//       await wait(Math.round(Math.random() * 700));
//     }
//   }

//   main().catch((err) => console.log(err));
// }
