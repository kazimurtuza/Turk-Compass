const mongoose = require('mongoose');

const businessPostSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    sub_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    business_name: {
        type: String,
        required: [true, 'Name is required']
    },
    description: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    located_in: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
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

module.exports = mongoose.model("BusinessPost", businessPostSchema);