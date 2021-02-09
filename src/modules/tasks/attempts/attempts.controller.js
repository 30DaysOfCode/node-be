const Attempt = require("./attempt.model");
const { generateResponse, createError } = require("../../../utils");

let notFound = generateResponse(404, createError('That attempt does not exist.'));

exports.fetchAttempts = async function (req, res) {
    console.log(req.query)
    let data = await Attempt.find(req.query);
    let result = generateResponse(200, {
        data: data,
    });
    res.json(result);
};

exports.fetchAttemptById = async function (req, res) {
    let attemptId = req.params.id;
    try {
        let data = await Attempt.findById(attemptId);
        if(!data) return res.json(notFound);
        let result = generateResponse(200, {
            data: data,
        });
        res.json(result);
    } catch (error) {
        res.json(notFound)
    }
};

exports.addAttempt = async function (req, res) {
    const { userId, link, day, track } = req.body;
    try {
        var attempt = Attempt({
            user: userId,
            submissionLink: link,
            day: day,
            track: track
        });
        await attempt.save();
        res.json(generateResponse(201, {message: 'Attempt added.'}))
    } catch (error) {
        res.json(generateResponse(400, createError(error.message)))
    }
};

exports.editAttempt = async function (req, res) {
    let attemptId = req.params.id;
    let link = req.body.link;
    try {
        let data = await Attempt.findByIdAndUpdate(attemptId, { link: link });
        if(!data) return res.json(notFound);
        res.json(generateResponse(201, {message: 'Attempt edited.'}))
    } catch (error) {
        res.json(generateResponse(400, createError(error.message)))
    }
};

exports.deleteAttempt = async function (req, res) {
    let attemptId = req.params.id;
    try {
        let data = await Attempt.findByIdAndDelete(attemptId);
        if(!data) return res.json(notFound);
        let result = generateResponse(200, {
            message: 'Attempt deleted',
        });
        res.json(result);
    } catch (error) {
        res.json(notFound)
    }
};
