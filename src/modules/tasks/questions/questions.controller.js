const Question = require("./question.model");
const { generateResponse, createError } = require("../../../utils");

let notFound = generateResponse(
    404,
    createError("That question does not exist.")
);

class QuestionController {
    /*
     * This function fetches all questions. It also filters
     * the questions based on the queries passed into the
     * request URL.
     */
    static async fetchQuestions(req, res) {
        console.log(req.query);
        let data = await Question.find(req.query);
        let result = generateResponse(200, {
            data: data,
        });
        res.json(result);
    }

    /*
     * This function fetches one question, which is the question
     * with the passed in ID. If no question with that ID exists,
     * the appropriate message is delivered.
     */
    static async fetchQuestionById(req, res) {
        let questionId = req.params.id;
        try {
            let data = await Question.findById(questionId);
            if (!data) return res.json(notFound);
            let result = generateResponse(200, {
                data: data,
            });
            res.json(result);
        } catch (error) {
            res.json(notFound);
        }
    }

    /*
     * This function is responsible for the addition of
     * questions to the database. It expects the required
     * fields from the request and creates the question with
     * the data.
     */
    static async addQuestion(req, res) {
        const { cohortId, task, day, track } = req.body;
        try {
            var question = Question({
                cohort: cohortId,
                task: task,
                day: day,
                track: track,
            });
            await question.save();
            res.json(generateResponse(201, { message: "Question added." }));
        } catch (error) {
            res.json(generateResponse(400, createError(error.message)));
        }
    }

    /*
     * This function does the editing of questions. It takes
     * the values of the provided fields and updates them in
     * the database.
     */
    static async editQuestion(req, res) {
        let questionId = req.params.id;
        try {
            let data = await Question.findByIdAndUpdate(questionId, req.body);
            if (!data) return res.json(notFound);
            res.json(generateResponse(201, { message: "Question edited." }));
        } catch (error) {
            res.json(generateResponse(400, createError(error.message)));
        }
    }

    /*
     * This function deletes a question, which is the question
     * with the passed in ID. If no question with that ID exists,
     * the appropriate message is delivered.
     */
    static async deleteQuestion(req, res) {
        let questionId = req.params.id;
        try {
            let data = await Question.findByIdAndDelete(questionId);
            if (!data) return res.json(notFound);
            let result = generateResponse(200, {
                message: "Question deleted",
            });
            res.json(result);
        } catch (error) {
            res.json(notFound);
        }
    }
}

module.exports = QuestionController;
