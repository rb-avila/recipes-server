const mongoose = require('mongoose');

const instructionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    instruction: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Instruction', instructionSchema);