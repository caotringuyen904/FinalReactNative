const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    phone: { type: String, require: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    arrivalTime: { type: String, require: true },
    quantity: { type: Number, require: true },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
})

module.exports = mongoose.model('Reservation', reservationSchema)   