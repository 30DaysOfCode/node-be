
generateCouponCode = () => require('crypto-random-string')(10).toUpperCase()

module.exports = generateCouponCode;