const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    images: { type: [String], required: true },
    active: { type: Boolean, default: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    // location: {
    //     type: { type: String, enum: ['Point'], required: true },
    //     coordinates: { type: [Number], required: true }
    // }
});

// restaurantSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Restaurant', restaurantSchema)