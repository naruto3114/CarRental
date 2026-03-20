import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema.Types

const carSchema = new mongoose.Schema({
    owner: {type: ObjectId, ref: 'User'},
    brand: {type: String, ref: 'true'},
    model: {type: String, ref: 'true'},
    image: {type: String, ref: 'true'},
    year: {type: Number, ref: 'true'},
    category: {type: String, ref: 'true'},
    seating_capacity: {type: Number, ref: 'true'},
    fuel_type: { type: String, required: true },
    transmission: {type: String, ref: 'true'},
    pricePerDay: {type: Number, ref: 'true'},
    location: {type: String, ref: 'true'},
    description: {type: String, ref: 'true'},
    isAvailable: {type: Boolean, ref: 'true'},
},{timestamps: true})

const Car = mongoose.model('Car',carSchema)

export default Car;