const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    cohort: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cohort',
        required: true
    },
    day: {
        type: Number
    },
    track: {
        type: String,
        required: true
    },
    task: {
        type: String
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('Question', QuestionSchema);