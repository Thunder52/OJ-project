import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// require('dotenv').config();


const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));


const DBConnection=async ()=>{
    const MONGODB_URI=process.env.MONGODB_URI;
    await mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    // useNewUrlParser: true, // Remove this option
  })

    try{
        await mongoose.connect(MONGODB_URI);
        console.log("DB connection stablished");
    }catch(error){
        console.log("Error connecting to mongo db"+error);
    }
};

// module.exports={DBConnection};
export { DBConnection };

// const mongoose = require('mongoose');
// require('dotenv').config();

// const DBConnection = async () => {

//     const MONGO_URI = process.env.MONGO_URI;
//     try {
//         await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
//         console.log('Database connected successfully');
//     } catch (error) {
//         console.log('Error while connecting with the database ', error.message);
//     }
// }

// module.exports = { DBConnection };