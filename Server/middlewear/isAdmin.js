import bcrypt from 'bcryptjs';
import User from '../models/Users.js';



const isAdmin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please provide email and password' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ msg: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ msg: 'Invalid password' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ msg: 'Authorization denied' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

export default isAdmin;
