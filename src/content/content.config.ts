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

const solutionSchema = z.object({
  top_section: z.object({
    title: z.string(),
    description: z.string(),
    button: z.object({
      label: z.string(),
      href: z.string()
    }).optional(),
    hero_image: z.string().optional()
  }),
  sections: z.array(z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    imageSide: z.string().optional()
  }))
})

const startupsSmesCollection = defineCollection({
  type: 'content',
  schema: solutionSchema
})

const personalCollection = defineCollection({
  type: 'content',
  schema: solutionSchema
})

export const collections = {
  blogs: blogsCollection,
  'startups-smes': startupsSmesCollection,
  personal: personalCollection
}
