import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';

// Correctly get __filename and __dirname
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename); // This will give the directory name
const dirInputs = path.join(_dirname, 'inputs');

// Ensure the directory exists
if (!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive: true });
}

// Function to generate an input file
const generateInputFile = async (input) => {
    const jobID = uuid();
    const input_filename = `${jobID}.txt`;
    const input_filePath = path.join(dirInputs, input_filename);
    await fs.promises.writeFile(input_filePath, input); // Use the asynchronous version
    return input_filePath;
};

export default generateInputFile ;