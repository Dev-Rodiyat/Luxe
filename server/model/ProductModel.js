const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    imagePublicId: String,
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String },
    category: {
        type: String,
        required: true,
        enum: {
            values: ["Electronics", "Clothing", "Books", "Beauty", "Home", "Toys", "Other"],
            message: "{VALUE} is not a valid category",
        },
    },
}, {
    timestamps: true,
    minimize: false,
});


const Product = mongoose.model("Product", productSchema);
module.exports = { Product };

