const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurantData'
    },
    message: {
        type: String,
        default: null
    },
    rate: {
    type: Number,
        default: 0
    }
})
const FeedBack = mongoose.model('feedback', schema)

module.exports = FeedBack
