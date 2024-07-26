import express from 'express';
const app=express();
import Problem from './models/problems.js';
import generateFile from './generateFile.js';
import generateInputFile from './generateInputFile.js';
import executeCode from './executeCode.js';
import cors from 'cors';
import { DBConnection } from './database/db.js';
import dotenv from 'dotenv';

dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

DBConnection();

app.post('/run/:id',async (req,res)=>{
    const {id}=req.params;
    const {code,language}=req.body;

    if(!code){
        return res.status(400).json({ success: false, error: "Empty code!" });
    }
    try {
        const problem=await Problem.findById(id);
        if(!problem){
            return res.status(404).json({message:'problem not found'});
        }
        let allPassed=true;
        const results=[];

        for(const testCase of problem.testcases){
            const inputPath=await generateInputFile(testCase.input);
            const filePath=await generateFile(language,code);
            const output=await executeCode(filePath,inputPath,language);

            if(output.trim()===testCase.output.trim()){
                results.push({testCase: testCase.input,result:'passed'});
            }else{
                results.push({testCase:testCase.input,result:`Failed (Expected: ${testCase.output}, Got: ${output})`});
                allPassed=false;
            }
        }
        res.json({results,allPassed});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

app.listen(5000,()=>{
    console.log("Server is listening on port 5000");
});