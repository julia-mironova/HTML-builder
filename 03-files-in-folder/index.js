
const path = require('path');
const fs = require('fs/promises');

let location3 = path.join(process.cwd(),'03-files-in-folder', 'secret-folder');

fs.readdir(location3, { withFileTypes: true }).then((files) => {
      files.forEach(file => {
          if (file.isFile()) {
      //console.log(file);
      console.log(`${file.name.slice(0, file.name.indexOf("."))} - ${file.name.slice(file.name.indexOf(".")+1)} - `);
    }
    });
  }).catch((e)=>console.log(e));


