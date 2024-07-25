import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { DBConnection } from './data base/db.js';
import User from './models/Users.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
// import routes from './routes/Routes.js'
import problemRoutes from './routes/problemRoutes.js';
import Problems from './models/problems.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json({extended:false}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

DBConnection();

// app.use('/api', routes);
app.use('/api/problems',problemRoutes);
// app.use('/api/problems', require('./routes/problem'));
// app.use('/api/submit', require('./routes/submit'));
// app.use('/api/leaderboard', require('./routes/leaderboard'));

app.post("/Register", async (req, res) => {
    const {name,email,password}=req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).send("Please enter all the credentials fields!");
        }
        const existingUser = await User.findOne({ email });
        console.log(existingUser);
        if (existingUser) {
            return res.status(400).send("User already exists");
        }
        const hashedPassword = bcrypt.hash(password, 10);

        const user =  User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user.token = token;
        user.password = undefined;
        return res.status(200).json({ message: "You have successfully registered!", user });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
});

app.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Please enter all the information");
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("Please register first");
        }
        const enteredPassword = await bcrypt.compare(password, user.password);
        if (!enteredPassword) {
            return res.status(401).send("Incorrect Password");
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user.token = token;
        user.password = undefined;

        const option = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        return res.status(200).cookie("token", token, option).json({
            message: "You have successfully logged in",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }
});

// app.post("/problems",async (req,res)=>{
//     const { name, topic,describtion } = req.body;

//   try {
//     const newProblem = new Problems({ name, topic, describtion });
//     const problem = await newProblem.save();
//     res.json(problem);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

app.post('/run/:id', async (req, res) => {
    const { id } = req.params;
    const { code, language } = req.body;
  
    try {
      const problem = await Problem.findById(id);
      if (!problem) {
        return res.status(404).json({ message: 'Problem not found' });
      }
  
      let allPassed = true;
      const results = [];
  
      for (const testCase of problem.testcases) {
        const payload = { code, language, input: testCase.input };
        const { data } = await axios.post('http://localhost:8000/run', payload);
  
        if (data.output.trim() === testCase.output.trim()) {
          results.push({ testCase: testCase.input, result: 'Passed' });
        } else {
          results.push({ testCase: testCase.input, result: `Failed (Expected: ${testCase.output}, Got: ${data.output})` });
          allPassed = false;
        }
      }
  
      res.json({ results, allPassed });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

