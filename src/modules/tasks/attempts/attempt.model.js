const mongoose = require('mongoose');

const AttemptSchema = mongoose.Schema({
    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant',
        required: true
    },
    cohort: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cohort',
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    track: {
        type: String,
        required: true
    },
    submissionLink: {
        type: String,
        required: true
    },
    review: {
        type: String
    },
    score: {
        type: Number
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Attempt', AttemptSchema);