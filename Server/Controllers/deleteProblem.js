import Problem from '../models/problems.js';
export const deleteProblem = async (req, res) => {
    try {
      const problem = await Problem.findById(req.params.id);
      if (!problem) {
        return res.status(404).json({ message: 'Problem not found' });
      }
  
      await Problem.deleteOne({ _id: req.params.id });
      res.json({ message: 'Problem deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };