const fs = require('fs');
const path = require('path');

let location1 = path.join(process.cwd(),'01-read-file', 'text.txt');
//через ридстрим читаем
let readStream = fs.createReadStream(location1, 'utf-8');
readStream.on('data', chunk => {
  //console.log ('data');
  console.log(chunk.toString());
});





/*readStream.on('readable', () => {
  let a=`${readStream.read()}`;
  console.log(a); 
  //null in the end of all doc
});

//2 desigion
readStream.on('data', chunk => {
  //console.log ('data');
  console.log(chunk);
}

readStream.on('readable', () => {
  //console.log('readable');
  const buffer = readStream.read();
  if (buffer) {
    // console.log(buffer);
    console.log(buffer.toString());
  }
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