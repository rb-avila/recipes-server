const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    recipeImage: { type: String, required: false },
    category: { type: String, required: false },
    isBreadMachine: { type: Boolean, required: false, default: false },
    prepTime: { type: Number },
    cookTime: { type: Number},
    instructions: { type: String }, 
    ingredients: [
        { 
            name: { type: String },
            amount: { type: String },
        }
    ]
});

module.exports = mongoose.model('Recipe', recipeSchema);