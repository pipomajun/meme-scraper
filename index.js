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
  https
    .get(imgUrls[j], (res) => {
      const path = `./memes/0${j + 1}.jpg`;
      const stream = fs.createWriteStream(path);

      res.pipe(stream);

      stream.on('finish', () => {
        stream.close();
        console.log('Image downloaded');
      });
    })
    .on('error', (err) => {
      // handle error
      console.log(err);
    });
}
