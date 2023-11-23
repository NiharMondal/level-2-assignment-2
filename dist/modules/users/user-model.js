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
    orders: [orderSchema],
}, {
    toJSON: {
        virtuals: true,
        transform: true,
    },
});
//exclude password field from user document
userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});
userSchema.static("myStaticMethod", function myStaticMethod(id) {
    const user = User.findById(id);
    return user;
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
