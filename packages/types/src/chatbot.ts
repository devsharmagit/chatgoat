import z from "zod";

export const chatbotPost = z.object({
    name: z.string().min(3).max(20),
})

export type ChatBotPostType = z.infer<typeof chatbotPost>