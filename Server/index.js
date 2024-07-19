import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { DBConnection } from './data base/db.js';
import User from './models/Users.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import routes from './routes/Routes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json({extended:false}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

DBConnection();

app.use('/api', routes);

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

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

