import { defineCollection, z } from 'astro:content'

const blogsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.string(),
    image: z.string().optional(),
    blog_no: z.number(),
  })
})

export const collections = {
  blogs: blogsCollection
}
