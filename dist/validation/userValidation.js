"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateValidation = exports.userValidation = exports.orderValidation = void 0;
const zod_1 = require("zod");
exports.orderValidation = zod_1.z.object({
    productName: zod_1.z
        .string()
        .min(2, { message: "Name should be more characters" }),
    price: zod_1.z.number().int().positive({ message: "Must be a positive value" }),
    quantity: zod_1.z.number().int().positive({ message: "Must be a positive value" }),
});
// Defining the user schema
exports.userValidation = zod_1.z.object({
    userId: zod_1.z
        .number()
        .int("User id must be an integer")
        .positive({ message: "Must be a positive value" }),
    username: zod_1.z.string().trim().max(30, { message: "Username must be unique" }),
    password: zod_1.z.string().trim(),
    fullName: zod_1.z.object({
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
    }),
    age: zod_1.z.number().int().positive(),
    email: zod_1.z
        .string()
        .trim()
        .email({ message: "Provide a valid email" })
        .toLowerCase(),
    isActive: zod_1.z.boolean().optional(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: zod_1.z.object({
        street: zod_1.z.string(),
        city: zod_1.z.string(),
        country: zod_1.z.string(),
    }),
    orders: zod_1.z.array(exports.orderValidation).optional(),
});
exports.userUpdateValidation = exports.userValidation.optional();
