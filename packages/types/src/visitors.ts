import {z} from "zod";

export const visitorPost = z.object({
  chatbotId: z.number()  
})

export type VisitorPostType = z.infer<typeof visitorPost>

