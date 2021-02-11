const mongoose = require('mongoose');

const TrxSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    coupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon'
    },
    forTier: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: Date()
}, {
    timestamps: true
});


module.exports = mongoose.model('Transaction', TrxSchema);
