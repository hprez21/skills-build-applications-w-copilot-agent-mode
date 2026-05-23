"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['member', 'coach', 'admin'], required: true },
    profile: {
        age: { type: Number, required: true },
        fitnessGoal: { type: String, required: true },
        joinedAt: { type: Date, required: true },
    },
}, { collection: 'users', timestamps: true });
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
