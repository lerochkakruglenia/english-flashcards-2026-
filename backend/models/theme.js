import mongoose from 'mongoose';

const themeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    color: { type: String, default: '#3b82f6' },
    icon: String
}, { timestamps: true });

const Theme = mongoose.model('Theme', themeSchema);
export default Theme;