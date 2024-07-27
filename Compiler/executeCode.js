import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const outputPath = path.join(_dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, inputPath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);
    return new Promise((resolve, reject) => {
        const command = `g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && ./${jobId}.out < "${inputPath}"`;

      
        
        exec(command, (error, stdout, stderr) => {
            if (error) {
               
                return reject({ error, stderr });
            }
            if (stderr) {
                
                return reject(stderr);
            }
            resolve(stdout);
        });
    });
};

const executeJava = (filepath, inputPath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const className = path.basename(filepath, '.java');

    return new Promise((resolve, reject) => {
        const command = `javac "${filepath}" && cd "${path.dirname(filepath)}" && java "${className}" < "${inputPath}"`;
      

        exec(command, (error, stdout, stderr) => {
            if (error) {
                
                return reject({ error, stderr });
            }
            if (stderr) {
                
                return reject(stderr);
            }
            resolve(stdout);
        });
    });
};

const executeCode = (filepath, inputPath, language) => {
    if (language === 'cpp') {
        return executeCpp(filepath, inputPath);
    } else if (language === 'java') {
        return executeJava(filepath, inputPath);
    }
};

export default executeCode;
