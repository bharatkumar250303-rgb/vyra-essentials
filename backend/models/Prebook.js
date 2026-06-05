import mongoose from 'mongoose';

const prebookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    productSlug: { type: String, required: true },
    productName: { type: String, required: true }
}, {
    timestamps: true
});

const Prebook = mongoose.model('Prebook', prebookSchema);
export default Prebook;
