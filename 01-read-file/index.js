const fs = require('fs');
const path = require('path');

let location1 = path.join(process.cwd(),'01-read-file', 'text.txt');
let readStream = fs.createReadStream(location1);
//через ридстрим
readStream.on('readable', () => {
  console.log(`${readStream.read()}`);
});

//асинхронка без ридстрим
/*let readText = fs.readFileSync('text.txt', 'utf-8', function (err, data) {
  console.log(data);
});
console.log(readText);*/

/*readStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
});
readStream.on('end', () => {
  console.log('There will be no more data.');
});

readStream.read(1);*/