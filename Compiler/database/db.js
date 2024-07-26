import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));


const DBConnection=async ()=>{
    const MONGODB_URI=process.env.MONGODB_URI;
    await mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    // useNewUrlParser: true, 
  })

    try{
        await mongoose.connect(MONGODB_URI);
        console.log("DB connection stablished");
    }catch(error){
        console.log("Error connecting to mongo db"+error);
    }
};

export { DBConnection };
