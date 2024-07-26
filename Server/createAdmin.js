import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/Users.js';

dotenv.config();

const createAdmin = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const adminEmail = 'husainali7865253@gmail.com'; // Replace with desired admin email
    const adminPassword = 'Hus@2002';  // Replace with desired admin password
    const adminName = 'Admin';

    try {
        let user = await User.findOne({ email: adminEmail });
        // if (user) {
        //     console.log('Admin already exists');
        //     return;
        // }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        user = new User({
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            role: 'admin', // Ensure role is set to admin
        });

        await user.save();
        console.log('Admin created successfully');
    } catch (error) {
        console.error('Error creating admin:', error);
    } finally {
        mongoose.connection.close();
    }
};

createAdmin();