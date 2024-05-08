const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    skill: {
        type: String,
        required: [true, 'skill is required']
    },
    requirement: {
        type: String,
        required: [true, 'requirement is required'],
    },
    benefit: {
        type: [{
            name: String,
            description: String
        }]
    },
    question: {
        type: [{
            name: String,
            options: []
        }],
        default: []
    },
    status: {
        type: Number,
        default: 1,
        enum: [0, 1]
    },
    is_delete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);