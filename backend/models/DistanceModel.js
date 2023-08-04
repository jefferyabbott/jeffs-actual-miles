import mongoose from 'mongoose';

const DistanceSchema = new mongoose.Schema({
    day: {
        type: Number,
    },
    exercise: {
        type: String,
    },
    distance: {
        type: Number,
    },
},
    {
        timestamps: true
    
});

const Distance = mongoose.model('Distance', DistanceSchema);

export default Distance;

