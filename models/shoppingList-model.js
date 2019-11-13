const mongoose = require('mongoose');

const shoppingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
    },
    ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
    },
    ingredient: { type: String, required: true },
    quantity: { type: Number },
    check: { type: Boolean },
});

module.exports = mongoose.model('ShoppingList', shoppingSchema);