import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'
dotenv.config();
import {DBConnection} from './data base/db.js';
import User from './models/Users.js'
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';



const app=express();
const PORT=process.env.PORT||8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

DBConnection();
app.post("/Register",async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!(name||email||password)){
            return res.status(400).send("Please enter all the credentials fields!");
        }
        const existingUser=await UserActivation.findOne({email});
        if(existingUser){
            return res.status(200).send("User already exist");
        }
        const hashedPassword=await bcrypt.hash(password,10);

        const user=await User.create({
            name,
            email,
            password:hashedPassword,
        });

        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user.token = token;
        user.password = undefined;
        res
            .status(200)
            .json({ message: "You have successfully registered!", user });
    } catch (error) {
        console.log(error);
    }
});

app.post("/",async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
})

app.listen(8000,()=>{
    console.log("Server is listening on port 8000");
});