// import express from 'express';
// const problemRouter=express.Router();
// import {createProblem,getProblems,getProblemById,updateProblem,deleteProblem} from '../Controllers/ProblemController.js';
// import auth from '../middlewear/authMiddlewear.js';


// problemRouter.post("/add-problems",auth,createProblem);

// problemRouter.get("/",getProblems);

// problemRouter.get('/:id',getProblemById);

// problemRouter.put('/:id',auth,updateProblem);

// problemRouter.delete('/:id',auth,deleteProblem);

// export default problemRouter;

import express from 'express';
const router = express.Router();
import Problem from '../models/problems.js';

import { getProblems, getProblemById, createProblem, updateProblem, deleteProblem } from '../controllers/ProblemController.js';

router.get('/', getProblems);
router.get('/:id', getProblemById);
router.post('/', createProblem);
router.put('/:id', updateProblem);
router.delete('/:id', deleteProblem);

// router.post('/', async (req, res) => {
//     const problem = new Problem(req.body);
//     try {
//       const savedProblem = await problem.save();
//       res.status(201).json(savedProblem);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  
//   // Read all problems
//   router.get('/', async (req, res) => {
//     try {
//       const problems = await Problem.find();
//       res.json(problems);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  
//   // Update a problem
//   router.put('/:id', async (req, res) => {
//     try {
//       const updatedProblem = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true });
//       res.json(updatedProblem);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  
//   // Delete a problem
//   router.delete('/:id', async (req, res) => {
//     try {
//       await Problem.findByIdAndDelete(req.params.id);
//       res.json({ message: 'Problem deleted' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

export default router;