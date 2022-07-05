const mongoose = require('mongoose')
const x = {
    lat: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    lng: {
        type: mongoose.Schema.Types.String,
        required: true
    }
}

const restaurantSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     default: this._id.toString()
    // },
    name: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    serviceOptions: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: x,
        required: true,
    },
})
const Restaurant = mongoose.model('restaurantData', restaurantSchema)

module.exports = Restaurant
