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
const sanitizeClassName = (filename) => {
    const baseName = path.basename(filename, path.extname(filename));
    
    // Replace any non-alphanumeric characters with underscores
    let sanitizedName = baseName.replace(/[^a-zA-Z0-9_]/g, '_');
    
    // Ensure the name starts with a letter or underscore
    if (!/^[a-zA-Z_]/.test(sanitizedName)) {
        sanitizedName = '_' + sanitizedName;
    }

    // Use a generic name 'Main' if the name is invalid after sanitization
    if (sanitizedName.length === 0) {
        sanitizedName = 'Main';
    }

    return sanitizedName;
};
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
    const originalJobId = path.basename(filepath).split(".")[0];
    const sanitizedClassName = sanitizeClassName(originalJobId);
    const newFilepath = path.join(path.dirname(filepath), `${sanitizedClassName}.java`);

    // Read the original Java file
    const javaCode = fs.readFileSync(filepath, 'utf-8');
    // Replace the class name in the Java code with the sanitized class name
    const updatedJavaCode = javaCode.replace(/class\s+\w+/, `class ${sanitizedClassName}`);
    
    // Write the updated Java code to a new file
    fs.writeFileSync(newFilepath, updatedJavaCode);

    return new Promise((resolve, reject) => {
        const command = `javac "${newFilepath}" && cd "${path.dirname(newFilepath)}" && java "${sanitizedClassName}" < "${inputPath}"`;

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
