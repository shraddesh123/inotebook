const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Import the Schema class

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User =mongoose.model('User', UserSchema);
User.createIndexes();//to create a unique index for database
module.exports = User
