import express from 'express';
const problemRouter=express.Router();
import {createProblem,getProblems,getProblemById,updateProblem,deleteProblem} from '../Controllers/ProblemController.js';
import auth from '../middlewear/authMiddlewear.js';


problemRouter.post("/add-problem",auth,createProblem);

problemRouter.get("/",getProblems);

problemRouter.get('/:id',getProblemById);

problemRouter.put('/:id',auth,updateProblem);

problemRouter.delete('/:id',auth,deleteProblem);

export default problemRouter;