import { z } from "zod";

export const orderValidation = z.object({
	productName: z
		.string()
		.min(5, { message: "Name should be more characters" }),
	price: z.number().int().positive({ message: "Must be a positive value" }),
	quantity: z.number().int().positive({ message: "Must be a positive value" }),
});

// Defining the user schema
export const userValidation = z.object({
	userId: z
		.number()
		.int("User id must be an integer")
		.positive({ message: "Must be a positive value" }),
	username: z.string().trim().max(30, { message: "Username must be unique" }),
	password: z.string().trim(),
	fullName: z.object({
		firstName: z.string(),
		lastName: z.string(),
	}),
	age: z.number().int().positive(),
	email: z
		.string()
		.trim()
		.email({ message: "Provide a valid email" })
		.toLowerCase(),
	isActive: z.boolean(),
	hobbies: z.array(z.string()),
	address: z.object({
		street: z.string(),
		city: z.string(),
		country: z.string(),
	}),
	orders: z.array(orderValidation),
});
