const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // recipe: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Recipe',
    //     required: true
    // },
    name: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    unitType: {
        type: String,
    }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);