const Certificate = require("./certificate.model");
const { generateResponse, createError } = require("../../utils");

//The general 404 error for this set of routes.
let notFound = generateResponse(
    404,
    createError("That certificate does not exist.")
);

/**
 * This function fetches all certificates in the database.
 * It also filters the questions based on the queries in
 * the request URL.
 */
exports.fetchCertificates = async function (req, res) {
    console.log(req.query);
    let data = await Certificate.find(req.query);
    let result = generateResponse(200, {
        data: data,
    });
    res.json(result);
};

/**
 * Function to fetch a particular certificate by ID. If
 * no cert. with that ID exists, the appropriate
 * message is delivered.
 */
exports.fetchCertById = async function (req, res) {
    let certificateId = req.params.id;
    try {
        let data = await Certificate.findById(certificateId);
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
 * Function to fetch a download a cert.
 */
exports.downloadCert = async function (req, res) {
    let certificateId = req.params.id;
    try {
        /**
         * @TODO Some really cool stuff that lets
         * users download their certs.
         */
        res.json(
            generateResponse(201, {
                message: "Certificate downloaded.",
            })
        )
    } catch (error) {
        res.json(notFound);
    }
};

/**
 * This function is responsible for the creation of
 * certificates. It expects the required fields from the
 * request and creates the certificate with the data.
 */
exports.createCertificate = async function (req, res) {
    const { userId, firstname, lastname, track, cohortId } = req.body;
    try {
        var certificate = Certificate({
            userId: userId,
            cohort: cohortId,
            firstname: firstname,
            lastname: lastname,
            track: track,
        });
        await certificate.save();
        res.json(
            generateResponse(201, {
                message: "Certificate created.",
            })
        );
    } catch (error) {
        res.json(generateResponse(400, createError(error.message)));
    }
};

/**
* Function to edit certificates. It allows users to edit
* info on the cert. e.g. name, track, cohort etc.
*/
exports.editCertificate = async function (req, res) {
    let certificateId = req.params.id;
    try {
        let data = await Certificate.findByIdAndUpdate(
            certificateId,
            req.body
        );
        if (!data) return res.json(notFound);
        res.json(
            generateResponse(201, {
                message: "certificate edited.",
            })
        );
    } catch (error) {
        res.json(generateResponse(400, createError(error.message)));
    }
};

/**
Function to delete a particular certificate by ID. If no
certificate with that ID exists, the appropriate message
is delivered.
*/
exports.deleteCertificate = async function (req, res) {
    let certificateId = req.params.id;
    try {
        let data = await Certificate.findByIdAndDelete(certificateId);
        if (!data) return res.json(notFound);
        let result = generateResponse(200, {
            message: "Certificate deleted",
        });
        res.json(result);
    } catch (error) {
        res.json(notFound);
    }
};
