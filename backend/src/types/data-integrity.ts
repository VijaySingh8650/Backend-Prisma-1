import { z } from "zod";

export const ZIngredients = z.object({
    name: z.string()
});

export const ZUsers = z.object({
    username: z.string().min(2),
    password: z.string().min(3),
    email: z.string().email(),
})

export const ZParams = z.object({
    id: z.string().min(1),
})

export const ZUser_Updation = z.object({
    username: z.string().min(1),
    email: z.string().min(1),
    password: z.string().min(1)
})

export const ZMeals = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    userId: z.string().min(1)
})

export const ZDelete_Meal = z.object({
    userId: z.string().min(1),
})

