import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    learnedCards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
    studyingCards: [{
        card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
        correctAnswers: { type: Number, default: 0 }
    }]
}, { timestamps: true });

// Хеширование пароля перед сохранением
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model('User', userSchema);
export default User;