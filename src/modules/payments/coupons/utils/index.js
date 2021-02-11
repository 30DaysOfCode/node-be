
generateCouponCode = () => require('crypto-random-string')(8).toUpperCase()

module.exports = generateCouponCode;