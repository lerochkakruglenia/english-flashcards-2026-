import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
    english: { type: String, required: true },
    russian: { type: String, required: true },
    transcription: String,
    examples: [String],
    theme: { type: mongoose.Schema.Types.ObjectId, ref: 'Theme', required: true }
}, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);
export default Card;