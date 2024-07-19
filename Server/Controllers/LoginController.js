import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

exports.loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:'Invalid Credentials'});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:'Invalid Credentials'});
        }
        const payload={
            user:{id:user.id}
        };
        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {expiresIn:360000},
            (error,token)=>{
                if(error) throw error;
                res.json({token});
            }
        )
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};