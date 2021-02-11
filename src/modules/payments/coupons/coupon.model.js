const mongoose = require('mongoose');

const CouponSchema = mongoose.Schema({
    code: {
        type: String,
        default: require('./utils')()
    },
    discount: {
        type: Number,
        required: true
    },
    limit: {
        type: Number
    },
    remaining: {
        type: Number
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Coupon', CouponSchema);