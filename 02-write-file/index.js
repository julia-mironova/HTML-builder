const fs = require('fs');
const path = require('path');
const readline = require('readline');

const { stdin: input, stdout: output } = require('process');

let location2 = path.join(process.cwd(),'02-write-file', 'write.txt');
let writeStream = fs.createWriteStream(location2, 'utf-8');

const rl = readline.createInterface({ input, output });

function goToInput(input) {
  if (input == 'exit'){
    console.log('Done, good bue!');
    rl.close();
  } else {
    writeStream.write(`${input}\n`);
  }
}

rl.question('Hallow, write your text \n', goToInput);

rl.on('line', goToInput);

rl.on('SIGINT', () => {
  console.log('Done, good bye!');
  rl.close();
});



/*rl.on('history', (history) => {
  console.log(`Received: ${history}`);
});*/







