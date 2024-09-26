import {z} from "zod";

export const visitorPost = z.object({
  chatbotId: z.string()  
})

export type VisitorPostType = z.infer<typeof visitorPost>

