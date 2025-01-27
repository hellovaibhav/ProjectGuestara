import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    taxApplicability: {
        type: Boolean, default: false
    },
    tax: {
        type: Number, default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    deletedAt: {
        type: Date,
        default:null
    }
}, { timestamps: true });

// Compound Indexing to ensure unique subCategory name in a category
subCategorySchema.index({ name: 1, category: 1 }, { unique: true });

export default mongoose.model('SubCategory', subCategorySchema);