import Problem from '../models/problems.js';

export const createProblem = async (req, res) => {
  const { name, statement, difficulty, hints } = req.body;

  try {
    const newProblem = new Problem({ name, statement, difficulty, hints });
    const problem = await newProblem.save();
    res.json(problem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ msg: 'Problem not found' });
    }
    res.json(problem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const updateProblem = async (req, res) => {
  const { name, statement, difficulty, hints } = req.body;

  try {
    let problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ msg: 'Problem not found' });
    }

    problem.name = name || problem.name;
    problem.statement = statement || problem.statement;
    problem.difficulty = difficulty || problem.difficulty;
    problem.hints = hints || problem.hints;

    await problem.save();
    res.json(problem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const deleteProblem = async (req, res) => {
  try {
    let problem = await Problem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ msg: 'Problem not found' });
    }

    await problem.remove();
    res.json({ msg: 'Problem removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};