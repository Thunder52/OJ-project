import mongoose from "mongoose";
const Problemschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    statement:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        required:true
    },
    hints:{
        String
    },
});

const Problem = mongoose.model('Problem', Problemschema);
export default Problem;