import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    displayName: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    verificationCode: {
        type: mongoose.Schema.Types.String,
        default: undefined
    },
    resetPasswordCode: {
        type: mongoose.Schema.Types.String,
        default: undefined
    },
    resetPasswordExpires: {
        type: mongoose.Schema.Types.Date,
        default: undefined
    },
    isVerified: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    lastVerificationSent: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    }
});

export const User = mongoose.model('User', UserSchema);