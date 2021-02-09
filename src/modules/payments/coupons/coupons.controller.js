const coupon = require("./coupon.model");
const { generateResponse, createError } = require("../../../utils");

//The general 404 error for this set of routes.
let notFound = generateResponse(
    404,
    createError("That coupon does not exist.")
);

/**
 * This function fetches all task coupons in the database.
 * It also filters the coupons based on the queries in
 * the request URL.
 */
exports.fetchCoupons = async function (req, res) {
    console.log(req.query);
    let data = await Coupon.find(req.query);
    let result = generateResponse(200, {
        data: data,
    });
    res.json(result);
};

/**
 * Function to fetch a particular coupon by ID. If
 * no coupon with that ID exists, the appropriate
 * message is delivered.
 */
exports.fetchCouponById = async function (req, res) {
    let couponId = req.params.id;
    try {
        let data = await Coupon.findById(couponId);
        if (!data) return res.json(notFound);
        let result = generateResponse(200, {
            data: data,
        });
        res.json(result);
    } catch (error) {
        res.json(notFound);
    }
};

/**
 * This function is responsible for the creation of
 * coupons. It expects the required fields from the
 * request and creates the coupon with the data.
 */
exports.createCoupon = async function (req, res) {
    const { userId, link, day, track, cohortId } = req.body;
    try {
        var coupon = Coupon(req.body);
        await coupon.save();
        res.json(
            generateResponse(201, {
                message: "coupon added.",
            })
        );
    } catch (error) {
        res.json(generateResponse(400, createError(error.message)));
    }
};

/**
* Function to edit coupons. It allows users to edit
* only the link to their submissions.
*/
exports.editCoupon = async function (req, res) {
    let couponId = req.params.id;
    let link = req.body.link;
    try {
        let data = await Coupon.findByIdAndUpdate(couponId, {
            link: link,
        });
        if (!data) return res.json(notFound);
        res.json(
            generateResponse(201, {
                message: "coupon edited.",
            })
        );
    } catch (error) {
        res.json(generateResponse(400, createError(error.message)));
    }
};

/**
Function to delete a particular coupon by ID. If no
coupon with that ID exists, the appropriate message
is delivered.
*/
exports.deleteCoupon = async function (req, res) {
    let couponId = req.params.id;
    try {
        let data = await Coupon.findByIdAndDelete(couponId);
        if (!data) return res.json(notFound);
        let result = generateResponse(200, {
            message: "coupon deleted",
        });
        res.json(result);
    } catch (error) {
        res.json(notFound);
    }
};
