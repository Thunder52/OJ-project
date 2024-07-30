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
import User from '../models/Users.js';
import isAdmin from '../middlewear/isAdmin.js';

// import { getProblems, getProblemById, createProblem, updateProblem, deleteProblem } from '../controllers/ProblemController.js';
import { getProblems } from '../Controllers/getProblems.js';
import { getProblemById } from '../Controllers/getProblemById.js';
import { createProblem } from '../Controllers/createProblem.js';
import { updateProblem } from '../Controllers/updateProblem.js';
import { deleteProblem } from '../Controllers/deleteProblem.js';

router.get('/', getProblems);
router.get('/:id', getProblemById);
router.post('/',  createProblem);
router.put('/:id',  updateProblem);
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

router.post('/:userId/solved', async (req, res) => {
    try {
      const userId = req.params.userId;
      const { problemId } = req.body;
      const user = await User.findById(userId);
      if (!user.solvedProblems.includes(problemId)) {
        user.solvedProblems.push(problemId);
        await user.save();
      }
      res.status(200).json({ message: 'Problem added to solved list' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating solved problems', error });
    }
  });


export default router;