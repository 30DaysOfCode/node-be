const Question = require("./question.model");
const { generateResponse, createError } = require("../../../utils");


let notFound = generateResponse(404, createError('That question does not exist.'));

exports.fetchQuestions = async function (req, res) {
    let data = await Question.find({});
    let result = generateResponse(200, {
        data: data,
    });
    res.json(result);
};

exports.fetchQuestionById = async function (req, res) {
    let questionId = req.params.id;
    try {
        let data = await Question.findById(questionId);
        if(!data) return res.json(notFound);
        let result = generateResponse(200, {
            data: data,
        });
        res.json(result);
    } catch (error) {
        res.json(notFound)
    }
};

exports.addQuestion = async function (req, res) {
    const { cohortId, task, day, track } = req.body;
    try {
        var question = Question({
            cohort: cohortId,
            task: task,
            day: day,
            track: track
        });
        await question.save();
        res.json(generateResponse(201, {message: 'Question added.'}))
    } catch (error) {
        res.json(generateResponse(400, createError(error.message)))
    }
};

exports.editQuestion = async function (req, res) {
    let questionId = req.params.id;
    try {
        let data = await Question.findByIdAndUpdate(questionId, req.body);
        if(!data) return res.json(notFound);
        res.json(generateResponse(201, {message: 'Question edited.'}))
    } catch (error) {
        res.json(generateResponse(400, createError(error.message)))
    }
};

exports.deleteQuestion = async function (req, res) {
    let questionId = req.params.id;
    try {
        let data = await Question.findByIdAndDelete(questionId);
        if(!data) return res.json(notFound);
        let result = generateResponse(200, {
            message: 'Question deleted',
        });
        res.json(result);
    } catch (error) {
        res.json(notFound)
    }
};
