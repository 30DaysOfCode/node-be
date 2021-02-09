const CouponController = require('./coupons.controller');
const { Router } = require('express');

var router = Router()

router.get('/', CouponController.fetchCoupons)

router.get('/:id', CouponController.fetchCouponById)

router.post('/create', CouponController.createCoupon)

router.patch('/edit/:id', CouponController.editCoupon)

router.delete('/delete/:id', CouponController.deleteCoupon)

module.exports = router