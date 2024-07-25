import {exec} from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const _filename=fileURLToPath(import.meta.url);
const _dirname=path.dirname(_filename);
const outputPath=path.join(_dirname,'outputs');

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true});
}

const executeCpp=(filepath,inputPath)=>{
    const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.exe < ${inputPath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};

export {executeCpp};