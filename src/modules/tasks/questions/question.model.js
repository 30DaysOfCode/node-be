const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
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
    task: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('Question', QuestionSchema);