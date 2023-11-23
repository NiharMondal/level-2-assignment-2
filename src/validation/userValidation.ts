import { z } from "zod";

const orderValidation = z.object({
	productName: z.string(),
	price: z.number(),
	quantity: z.number(),
});

// Defining the user schema
export const userValidation = z.object({
	userId: z.number().int("User id must be unique").positive(),
	username: z.string().trim().max(30, "Username must be unique"),
	password: z.string(),
	fullName: z.object({
		firstName: z.string(),
		lastName: z.string(),
	}),
	age: z.number().int().positive(),
	email: z.string().trim().email("Provide a valid email"),
	isActive: z.boolean(),
	hobbies: z.array(z.string()),
	address: z.object({
		street: z.string(),
		city: z.string(),
		country: z.string(),
	}),
	orders: z.array(orderValidation).optional(),
});
