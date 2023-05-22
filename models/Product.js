const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		img: { type: String, required: true },
		images: { type: Array },
		brand: { type: String },
		categories: { type: Array },
		oscillating: { type: String },
		cordLength: { type: String },
		size: { type: String },
		price: { type: Number, default: 0 },
		countInStock: { type: Number, required: true, default: 0 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
