"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    productName: String,
    price: Number,
    quantity: Number,
});
const userSchema = new mongoose_1.Schema({
    userId: { type: Number, unique: true },
    username: {
        type: String,
        unique: true,
    },
    password: String,
    fullName: {
        firstName: String,
        lastName: String,
    },
    age: Number,
    email: String,
    isActive: {
        type: Boolean,
        default: true,
    },
    hobbies: [String],
    address: {
        street: String,
        city: String,
        country: String,
    },
    orders: {
        type: [orderSchema],
        default: undefined,
    },
}, {
    toJSON: {
        virtuals: true,
        transform: true,
    },
});
//this is for exclude password field from user document
userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
