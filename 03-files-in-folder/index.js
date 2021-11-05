const path = require('path');
const fs = require('fs/promises');
//const fs2 = require('fs');

let location3 = path.join(process.cwd(),'03-files-in-folder', 'secret-folder');

fs.readdir(location3, { withFileTypes: true }).then((files) => {
  files.forEach(file => {
    let isFile = file.isFile();
    if (isFile) {
      fs.stat(path.join(location3, file.name)).then((stats) => {
        //console.log(stats.isDirectory());
        console.log(`${file.name.slice(0, file.name.indexOf('.'))} - ${file.name.slice(file.name.indexOf('.')+1)} - ${(stats.size / 1024).toFixed(2)}kb`);
      });
    }
  });
}).catch((e)=>console.log(e));


