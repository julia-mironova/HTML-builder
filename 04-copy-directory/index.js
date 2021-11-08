const path = require('path');
const fs = require('fs/promises');


let location4From =  path.join(process.cwd(),'04-copy-directory', 'files');
let location4To =  path.join(process.cwd(),'04-copy-directory', 'files-copy');


async function copyFiles() {
  try {
    fs.mkdir(location4To, {recursive: true});
    const files = await fs.readdir(location4From, {withFileTypes: true});
   
    files.forEach(file => {
      let isFile = file.isFile();
      if (isFile) {
        let fileFromHolder = path.join(process.cwd(), '04-copy-directory', 'files', file.name);
        let copyToNewHolder = path.join(process.cwd(), '04-copy-directory', 'files-copy', file.name);
        fs.copyFile(fileFromHolder, copyToNewHolder);
      } 
    });
    console.log('File(s) was written');
  } catch {
    console.error('File(s) can not written');
  }
}
  
async function isExistFolder() {
  const dir = location4To;
  try {
    await fs.access(dir);
    return true;
  } catch (e) {
    return false;
  }
}


async function cleanCopyDirectory() {
  let isExist = await isExistFolder();
  if (isExist) {
    let filesForClean = await fs.readdir(location4To, {withFileTypes: true});
    filesForClean.forEach(async (file) => {
      let copyToNewHolder = path.join(process.cwd(), '04-copy-directory', 'files-copy', file.name);
      await fs.unlink(copyToNewHolder);
    });
  // console.log('Directory is cleaned up. ');
  } else {
    // console.log('There is no directory. Clean up is not required');
  }
}


cleanCopyDirectory().then(() => {
  copyFiles();
});
  
  
/*fsPromises.copyFile( location4From, location4To)
.then(function() {
  console.log("File Copied");
})
.catch(function(error) {
  console.log(error);
});*/


