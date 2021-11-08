const path = require('path');
const fs = require('fs/promises');


let location6FromStyles =  path.join(process.cwd(),'06-build-page', 'styles');
let location6To =  path.join(process.cwd(),'06-build-page', 'project-dist');
let copyToStyle = path.join(location6To, 'style.css');

//make index





//copy style
async function isExistFile() {
  const file =  copyToStyle;
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
    console.log(`remove file ${copyToStyle}`);
    await fs.unlink(copyToStyle);
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
   
cleanCopyDirectory().then(() => {
  copyStyle();
});

//copy assets:
let location6FromAssetsFonts =  path.join(process.cwd(),'06-build-page', 'assets', 'fonts');
let location6ToAssetsFonts =  path.join(process.cwd(),'06-build-page', 'project-dist', 'assets', 'fonts');
let location6FromAssetsImg =  path.join(process.cwd(),'06-build-page', 'assets', 'img');
let location6ToAssetsImg =  path.join(process.cwd(),'06-build-page', 'project-dist', 'assets', 'img');
let location6FromAssetsSvg =  path.join(process.cwd(),'06-build-page', 'assets', 'svg');
let location6ToAssetsSvg =  path.join(process.cwd(),'06-build-page', 'project-dist', 'assets', 'svg');

//fonts
async function copyFilesAssetsFonts() {
  try {
    fs.mkdir(location6ToAssetsFonts, {recursive: true});
    const files = await fs.readdir(location6FromAssetsFonts, {withFileTypes: true});
    files.forEach(file => {
        let fileFromHolderFonts = path.join(location6FromAssetsFonts, file.name);
        let copyToNewHolderFonts = path.join(location6ToAssetsFonts, file.name);
        fs.copyFile(fileFromHolderFonts, copyToNewHolderFonts);
      
    });
    console.log('File(s) fonts was written');
  } catch {
    console.error('File(s) fonts can not written');
  }
}
  
async function isExistFolderFonts() {
  const dir = location6ToAssetsFonts;
  try {
    await fs.access(dir);
    return true;
  } catch (e) {
    return false;
  }
}


async function cleanCopyDirectoryAssetsFonts() {
  let isExist = await isExistFolderFonts();
  if (isExist) {
    let filesForClean = await fs.readdir(location6ToAssetsFonts, {withFileTypes: true});
    filesForClean.forEach(async (file) => {
      let copyToNewHolder = path.join(location6ToAssetsFonts, file.name);
      await fs.unlink(copyToNewHolder);
    });
  // console.log('Directory is cleaned up. ');
  } 
}


cleanCopyDirectoryAssetsFonts().then(() => {
  copyFilesAssetsFonts();
});
//svg
async function copyFilesAssetsSvg() {
  try {
    fs.mkdir(location6ToAssetsSvg, {recursive: true});
    const files = await fs.readdir(location6FromAssetsSvg, {withFileTypes: true});
    files.forEach(file => {
        let fileFromHolderSvg = path.join(location6FromAssetsSvg, file.name);
        let copyToNewHolderSvg = path.join(location6ToAssetsSvg, file.name);
        fs.copyFile(fileFromHolderSvg, copyToNewHolderSvg);
      
    });
    console.log('File(s) svg was written');
  } catch {
    console.error('File(s) svg can not written');
  }
}
  
async function isExistFolderSvg() {
  const dir = location6ToAssetsSvg;
  try {
    await fs.access(dir);
    return true;
  } catch (e) {
    return false;
  }
}


async function cleanCopyDirectoryAssetsSvg() {
  let isExist = await isExistFolderSvg();
  if (isExist) {
    let filesForClean = await fs.readdir(location6ToAssetsSvg, {withFileTypes: true});
    filesForClean.forEach(async (file) => {
      let copyToNewHolder = path.join(location6ToAssetsSvg, file.name);
      await fs.unlink(copyToNewHolder);
    });
  // console.log('Directory is cleaned up. ');
  } 
}

cleanCopyDirectoryAssetsSvg().then(() => {
  copyFilesAssetsSvg();
});

//img
async function copyFilesAssetsImg() {
  try {
    fs.mkdir(location6ToAssetsImg, {recursive: true});
    const files = await fs.readdir(location6FromAssetsImg, {withFileTypes: true});
    files.forEach(file => {
        let fileFromHolderImg = path.join(location6FromAssetsImg, file.name);
        let copyToNewHolderImg = path.join(location6ToAssetsImg, file.name);
        fs.copyFile(fileFromHolderImg, copyToNewHolderImg);
      
    });
    console.log('File(s) img was written');
  } catch {
    console.error('File(s) img can not written');
  }
}
  
async function isExistFolderImg() {
  const dir = location6ToAssetsImg;
  try {
    await fs.access(dir);
    return true;
  } catch (e) {
    return false;
  }
}


async function cleanCopyDirectoryAssetsImg() {
  let isExist = await isExistFolderImg();
  if (isExist) {
    let filesForClean = await fs.readdir(location6ToAssetsImg, {withFileTypes: true});
    filesForClean.forEach(async (file) => {
      let copyToNewHolder = path.join(location6ToAssetsImg, file.name);
      await fs.unlink(copyToNewHolder);
    });
  // console.log('Directory is cleaned up. ');
  } 
}

cleanCopyDirectoryAssetsImg().then(() => {
  copyFilesAssetsImg();
});