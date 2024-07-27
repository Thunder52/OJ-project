import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const dirCodes = path.join(_dirname, 'codes');

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {
    const jobID = uuid();
    const filename = `${jobID}.${format}`; // Removed the extra space
    const filePath = path.join(dirCodes, filename);
    await fs.writeFileSync(filePath, content);
    return filePath;
}

export default generateFile;
