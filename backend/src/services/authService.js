const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

class AuthService {
    async register(userData) {
        const { username, email, password } = userData;

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            throw new Error('User with this email or username already exists');
        }

        // Create new user
        const user = new User({ username, email, password });
        await user.save();

        // Generate token
        const token = generateToken(user._id);

        return {
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        };
    }

    async login(credentials) {
        const { email, password } = credentials;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // Generate token
        const token = generateToken(user._id);

        return {
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        };
    }

    async getUserById(userId) {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}

module.exports = new AuthService();