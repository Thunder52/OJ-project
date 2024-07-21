import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    // role:{
    //     tyoe:String,
    //     enum:['user','admin'],
    //     default:'user'
    // }
});

const User = mongoose.model('User', userSchema);
export default User;