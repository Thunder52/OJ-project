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
// import { verifyToken } from '../middleware/authMiddleware.js';
// import adminRoutes from './routes/adminRoutes.js'; 
import userRoutes from './routes/userRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: 'https://algoarena.site',
    methods:['POST','GET'],
    credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

DBConnection();

// app.use('/api', routes);
app.use('/api/problems',problemRoutes);
app.use('/api/user', userRoutes);
// app.use('/api', adminRoutes); 
// app.use('/api',compilerRoutes);
// app.use('/api/problems', require('./routes/problem'));
// app.use('/api/submit', require('./routes/submit'));
// app.use('/api/leaderboard', require('./routes/leaderboard'));



app.post("/register", async (req, res) => {
    // const { name, email, password, role } = req.body;
    // try {
    //     if (!name || !email || !password) {
    //         return res.status(400).send("Please enter all the credentials fields!");
    //     }
    //     const existingUser = await User.findOne({ email });
    //     if (existingUser) {
    //         return res.status(400).send("User already exists");
    //     }
    //     const hashedPassword = await bcrypt.hash(password, 10);
        
    //     // Only admin can create another admin
    //     let userRole = 'user';
    //     if (role && req.user && req.user.role === 'admin') {
    //         userRole = role;
    //     }

    //     const user = await User.create({
    //         name,
    //         email,
    //         password: hashedPassword,
    //         role: userRole,
    //     });

    //     const token = jwt.sign({ id: user._id, email, role: user.role }, process.env.SECRET_KEY, {
    //         expiresIn: "1d",
    //     });

    //     user.token = token;
    //     user.password = undefined;
    //     res.status(200).json({ message: "You have successfully registered!", user });
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).send("Internal Server Error");
    // }
    
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).send("Please enter all the credentials fields!");
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user',
        });
        res.status(200).json({ message: "You have successfully registered!", user: { name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/", async (req, res) => {
    const { email, password } = req.body;
    let token;
    try {
        if (!email || !password) {
            return res.status(400).send("Please enter all the information");
        }
        const user = await User.findOne({ email:email });
        if (!user) {
            return res.status(401).send("Please register first");
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).send("Incorrect Password");
        }
        token =await user.generateAuthToken();
        
      const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in",
            success: true,
            user: { name: user.name, email: user.email, role: user.role, token },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
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


app.listen(PORT,async () => {
    console.log(`Server listening on ${PORT}`);
    // await ensureAdminUserExists;
});

// const ensureAdminUserExists = async () => {
//     const User = (await import('./models/User.js')).default;
//     const adminEmail = 'husainali7865253@gmail.com';
//     const existingUser = await User.findOne({ email: adminEmail });
//     if (existingUser) {
//         if (existingUser.role !== 'admin') {
//             existingUser.role = 'admin';
//             await existingUser.save();
//             console.log('User role updated to admin');
//         } else {
//             console.log('Admin user already exists');
//         }
//     } else {
//         const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
//         await User.create({
//             name: 'Admin',
//             email: adminEmail,
//             password: hashedPassword,
//             role: 'admin',
//         });
//         console.log('Admin user created successfully');
//     }
// };

