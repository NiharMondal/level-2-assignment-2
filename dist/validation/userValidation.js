"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const orderValidation = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
// Defining the user schema
exports.userValidation = zod_1.z.object({
    userId: zod_1.z.number().int("User id must be unique").positive(),
    username: zod_1.z.string().trim().max(30, "Username must be unique"),
    password: zod_1.z.string(),
    fullName: zod_1.z.object({
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
    }),
    age: zod_1.z.number().int().positive(),
    email: zod_1.z.string().trim().email("Provide a valid email"),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: zod_1.z.object({
        street: zod_1.z.string(),
        city: zod_1.z.string(),
        country: zod_1.z.string(),
    }),
    orders: zod_1.z.array(orderValidation).optional(),
});
