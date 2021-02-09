const mongoose = require('mongoose');

const CertificateSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fisrtname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    track: {
        type: Number
    },
    cohort: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cohort',
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Certificate', CertificateSchema);