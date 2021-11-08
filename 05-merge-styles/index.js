const path = require('path');
const fs = require('fs/promises');

let location5From = path.join(process.cwd(),'05-merge-styles', 'styles');
let location5To =  path.join(process.cwd(),'05-merge-styles', 'project-dist');
let copyTo = path.join(location5To, 'bundle.css');

async function isExistFile() {
  const file =  copyTo;
  try {
    await fs.access(file);
    return true;
  } catch (e) {
    return false;
  }
}

async function cleanCopyDirectory() {
  let isExist = await isExistFile();
  if (isExist) {      
    console.log(`remove file ${copyTo}`);
    await fs.unlink(copyTo);
  }     
}
  
async function copyFiles() {
  try {
    fs.mkdir(location5To, {recursive: true});
    const files = await fs.readdir(location5From, {withFileTypes: true});
    
    //let wriate = fs2.createWriteStream(copyTo, 'utf-8');
    let contentsList = files.filter(file => {
      let isFile = file.isFile();
      let typeOfFile =  file.name.slice(file.name.indexOf('.')+1);
      return isFile && (typeOfFile=='css');
    })
      .map(async (file) => {   
        console.log(`Writing file ${file.name}`);
        let fileToRead = path.join(process.cwd(), '05-merge-styles', 'styles', file.name);
        return await fs.readFile(fileToRead, {encoding: 'utf-8'});
        //read.pipe(wriate, {end: false});        
      });    
    contentsList = await Promise.all(contentsList);
    contentsList.forEach(async (content) => {
      await fs.appendFile(copyTo, content, {encoding: 'utf-8'});
    });
    console.log('File(s) was written to bundle.css');
  } catch {
    console.error('File(s) can not written');
  }
}
   
cleanCopyDirectory().then(() => {
  copyFiles();
});








