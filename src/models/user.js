const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
