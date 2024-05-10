const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    slot: {
        type: String,
        required: [true, 'Name is required']
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

module.exports = mongoose.model("schedule", scheduleSchema);