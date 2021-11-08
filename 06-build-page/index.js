//if doesn't work contact to Ylia: +375292694503 (viber/watsup)

const path = require('path');
const fs = require('fs/promises');
const fs2 = require('fs');

let location6FromStyles =  path.join(process.cwd(),'06-build-page', 'styles');
let location6To =  path.join(process.cwd(),'06-build-page', 'project-dist');
let copyToStyle = path.join(location6To, 'style.css');

//make index
let location6FromTemplate =  path.join(process.cwd(),'06-build-page', 'template.html');
let location6FromComponents = path.join(process.cwd(),'06-build-page', 'components');
let write6ToHtml =  path.join(process.cwd(),'06-build-page', 'project-dist', 'index.html');



async function makeHtml() {  
  try {
    const files = await fs.readdir(location6FromComponents, {withFileTypes: true});
    let readTemplate = await fs.readFile(location6FromTemplate, {encoding: 'utf-8'});
    let contentsList = files.map(file => {
      let name = file.name.slice(0, file.name.indexOf('.'));
      return name;
    });
    for (let i=0; i<contentsList.length; i++){
      let file = contentsList[i];
      let fileToRead = path.join(location6FromComponents, `${file}.html`);
      let fileContent = await fs.readFile(fileToRead, {encoding: 'utf-8'});
      readTemplate = readTemplate.replace(`{{${file}}}`, fileContent);
    }    
    let writeStream = fs2.createWriteStream(write6ToHtml, 'utf-8');
    writeStream.write(readTemplate);
    console.log('File(s) was written to index.html');
  } catch (e) {
    console.error('File(s) can not written to index.html');
    console.error(e);
  }
}

async function copyStyle() {
  try {
    fs.mkdir(location6To, {recursive: true});
    const files = await fs.readdir(location6FromStyles, {withFileTypes: true});
    let contentsList = files.filter(file => {
      let isFile = file.isFile();
      let typeOfFile =  file.name.slice(file.name.indexOf('.')+1);
      return isFile && (typeOfFile=='css');
    })
      .map(async (file) => {   
        console.log(`Writing file ${file.name}`);
        let fileToRead = path.join(location6FromStyles, file.name);
        return await fs.readFile(fileToRead, {encoding: 'utf-8'});
        //read.pipe(wriate, {end: false});        
      });    
    contentsList = await Promise.all(contentsList);
    contentsList.forEach(async (content) => {
      await fs.appendFile(copyToStyle, content, {encoding: 'utf-8'});
    });
    console.log('File(s) was written to style.css');
  } catch {
    console.error('File(s) can not written');
  }
}
   


//copy assets:
let location6ToAssets =  path.join(process.cwd(),'06-build-page', 'project-dist', 'assets');
let location6FromAssets = path.join(process.cwd(),'06-build-page', 'assets');
let arrAssetsNameList =['fonts', 'img', 'svg'];

//universalFunction

async function copyFilesAssets() {
  for (let i=0; i < arrAssetsNameList.length; i++) { 
   let from =   path.join(location6FromAssets, arrAssetsNameList[i]);
   let to = path.join(location6ToAssets, arrAssetsNameList[i]);
  try {
   await fs.mkdir(to, {recursive: true});
    const files = await fs.readdir(from, {withFileTypes: true});
    files.forEach(file => {
        let fileFromHolder = path.join(from, file.name);
        let copyToNewHolder = path.join(to, file.name);
        fs.copyFile(fileFromHolder, copyToNewHolder);
      
    });
    console.log(`File(s) ${[i]} was written`);
  } catch {
    console.error(`File(s) ${[i]} can not written`);
  }
}
}

//clean directory

async function isExistFolder() {
  const dir = location6To;
  try {
    await fs.access(dir);
    return true;
  } catch (e) {
    return false;
  }
}

async function cleanCopyDirectoryAll() {
  let isExist = await isExistFolder();
    if (isExist) {
      try {
      await fs.rm(location6To, {recursive: true });
      } catch (e) {
        console.log(e);
      }
    }
} 


cleanCopyDirectoryAll().then(() => {
  copyFilesAssets();
  makeHtml();
  copyStyle();
});


