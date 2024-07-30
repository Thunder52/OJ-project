import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    tokens:
    [
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }]
});

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign(
            { _id: this._id, role: this.role },
            process.env.SECRET_KEY,
            { expiresIn: '1d' } 
        );
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
};

const User = mongoose.model('User', userSchema);
export default User;
