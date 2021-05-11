const Attempt = require("./attempt.model");
const { generateResponse, createError } = require("../../../utils");
const AuthController = require("../../Auth/auth.controller");

class AttemptController {
    //The general 404 error for this set of routes.
    static #notFound = generateResponse(
        404,
        createError("That attempt does not exist.")
    );
    /**
     * This function fetches all task attempts in the database.
     * It also filters the attempts based on the queries in
     * the request URL.
     */
    static async fetchAttempts(req, res) {
        console.log(req.query);
        let data = await Attempt.find(req.query);
        let result = generateResponse(200, {
            data: data,
        });
        res.json(result);
    }

    /**
     * Function to fetch a particular attempt by ID. If
     * no attempt with that ID exists, the appropriate
     * message is delivered.
     */
    static async fetchAttemptById(req, res) {
        let attemptId = req.params.id;
        try {
            let data = await Attempt.findById(attemptId);
            if (!data) return res.json(this.#notFound);
            let result = generateResponse(200, {
                data: data,
            });
            res.json(result);
        } catch (error) {
            res.json(this.#notFound);
        }
    }

    /**
     * This function is responsible for the submission of
     * attempts. It expects the required fields from the
     * request and creates the attempt with the data.
     */
    static async addAttempt(req, res) {
        const { userId, link, day, track, cohortId } = req.body;
        try {
            var attempt = Attempt({
                participant: participantId,
                cohort: cohortId,
                submissionLink: link,
                day: day,
                track: track,
            });
            await attempt.save();
            res.json(
                generateResponse(201, {
                    message: "Attempt added.",
                })
            );
        } catch (error) {
            res.json(generateResponse(400, createError(error.message)));
        }
    }

    /**
     * Function to edit attempts. It allows users to edit
     * only the link to their submissions.
     */
    static async editAttempt(req, res) {
        let attemptId = req.params.id;
        let link = req.body.link;
        try {
            let data = await Attempt.findByIdAndUpdate(attemptId, {
                link: link,
            });
            if (!data) return res.json(this.#notFound);
            res.json(
                generateResponse(201, {
                    message: "Attempt edited.",
                })
            );
        } catch (error) {
            res.json(generateResponse(400, createError(error.message)));
        }
    }

    /**
     * Function to delete a particular attempt by ID. If no
     * attempt with that ID exists, the appropriate message
     * is delivered.
     */
    static async deleteAttempt(req, res) {
        let attemptId = req.params.id;
        try {
            let data = await Attempt.findByIdAndDelete(attemptId);
            if (!data) return res.json(this.#notFound);
            let result = generateResponse(200, {
                message: "Attempt deleted",
            });
            res.json(result);
        } catch (error) {
            res.json(this.#notFound);
        }
    }
}

module.exports = AttemptController;
