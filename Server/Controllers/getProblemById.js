import Problem from '../models/problems.js';
export const getProblemById=async (req,res)=>{
    try {
        const problem=await Problem.findById(req.params.id);
        if(!problem){
            return res.status(400).json({message:'Problem not found'});
        }
        res.json(problem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};