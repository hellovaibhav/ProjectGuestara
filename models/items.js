import mongoose from "mongoose";
import subCategory from "./subCategory.js";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    taxApplicability: {
        type: Boolean,
        default: false
    },
    tax: {
        type: Number,
        default: 0
    },
    baseAmount: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true,
        default: function () {
            return this.baseAmount - this.discount;
        },
        validate: {
            validator: function () {
                // Ensure totalAmount matches the formula
                return this.totalAmount === this.baseAmount - this.discount;
            },
            message: "Total amount must be equal to baseAmount - discount",
        }
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    },
    deletedAt: {
        type: Date,
        default:null
    }
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);