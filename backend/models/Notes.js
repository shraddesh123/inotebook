const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Import the Schema class

const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes', NotesSchema);