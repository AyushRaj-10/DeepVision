import mongoose from 'mongoose';

const operatorProfileSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: {
        type: String,
        required: [true, "Email is required for alerts"],
        unique: true, 
        lowercase: true,
        trim: true,
        validate: { 
            validator: function(v) { return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v); },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    designation: { type: String, required: [true, "Designation is required"], trim: true },
    organization: { type: String, default: 'DRDO / Indian Navy', trim: true },
    lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

const OperatorProfile = mongoose.model('OperatorProfile', operatorProfileSchema);

export default OperatorProfile;