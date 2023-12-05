"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const orderSchema = new mongoose_1.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
const userSchema = new mongoose_1.Schema({
    userId: { type: Number, unique: true, required: true },
    username: {
        type: String,
        unique: true,
        required: true,
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
//hash password before saving document
userSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcryptjs_1.default.hash(this.password, 10);
        this.password = hashedPassword;
    });
});
//exclude password field from user document
userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});
//static method for user --> exists or not
userSchema.static("isUserExists", function isUserExists(id) {
    const user = User.findOne({ userId: id });
    return user;
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
