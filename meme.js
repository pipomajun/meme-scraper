// IMPORT DEPENDENCIES
import * as fs from 'node:fs';
import https from 'node:https';

// import fetch from 'node-fetch';

// CHECK IF FOLDER EXISTS, IF NOT CREATE ONE
try {
  if (!fs.existsSync('./customs')) {
    fs.mkdirSync('./customs');
  }
} catch (err) {
  console.error(err);
}

// DECLARE VARIABLES
const greeting = process.argv[2];
const name = process.argv[3];

const url = `https://api.memegen.link/images/bender/${greeting}/${name}.png`;

https
  .get(url, (res) => {
    const imagePath = './customs/custom-meme.jpg';
    const stream = fs.createWriteStream(imagePath);

    res.pipe(stream);

    stream.on('finish', () => {
      stream.close();
      console.log('Custom meme created and downloaded!');
    });
  })
  .on('error', (err) => {
    // handle error
    console.log(err);
  });
