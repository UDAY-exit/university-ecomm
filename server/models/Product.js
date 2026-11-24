import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "department",
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
},
    { timestamps: true }
);

const ProductModel = mongoose.model("product", productSchema);
export default ProductModel;