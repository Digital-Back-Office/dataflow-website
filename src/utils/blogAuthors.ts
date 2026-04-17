export type AuthorPlatform = 'x' | 'twitter' | 'linkedin' | 'youtube' | 'email'

export interface BlogAuthorSocial {
  platform: AuthorPlatform
  url: string
  label?: string
}

export interface BlogAuthor {
  id: string
  name: string
  headshot?: string
  bio: string
  socials: BlogAuthorSocial[]
}

export interface BlogAuthorOverride {
  id?: string
  name: string
  headshot?: string
  bio?: string
  socials?: BlogAuthorSocial[]
}

export const DEFAULT_AUTHOR_ID = 'dataflow-editorial-team'

const BLOG_AUTHORS: Record<string, BlogAuthor> = {
  'dataflow-editorial-team': {
    id: 'dataflow-editorial-team',
    name: 'Dataflow Editorial Team',
    headshot: '/assets/icons/icon-dataflow.svg',
    bio: 'Dataflow editorial contributors sharing practical guides on data engineering, MLOps, and AI application delivery.',
    socials: [
      {
        platform: 'linkedin',
        url: 'https://www.linkedin.com/company/dataflow-zone/',
        label: 'LinkedIn'
      },
      {
        platform: 'x',
        url: 'https://x.com/dataflowzone',
        label: 'X'
      }
    ]
  },
  'dinesh': {
    id: 'dinesh',
    name: 'Dinesh',
    headshot: '/assets/images/authors/dinesh.webp',
    bio: 'A driven individual learning new cutting edge technologies in the field of DevOps and DevSecOps for deploying scalable microservices applications securely in cloud environments.',
    socials: [
      {
        platform: 'linkedin',
        url: 'https://www.linkedin.com/in/dinesh-kumar-n-346583241/',
        label: 'LinkedIn'
      }
    ]
  },
  'hari-govind': {
    id: 'hari-govind',
    name: 'Hari Govind',
    headshot: '/assets/images/authors/hari-govind.webp',
    bio: 'Software Engineer specializing in building scalable backend systems and robust APIs. I enjoy tackling complex problems and developing solutions that make a real impact through modern frameworks and cloud technologies.',
    socials: [
      {
        platform: 'linkedin',
        url: 'https://www.linkedin.com/in/dinesh-kumar-n-346583241/',
        label: 'LinkedIn'
      }
    ]
  },
  'yaswanth-ampolu' : {
    id: 'yaswanth-ampolu',
    name: 'Yaswanth Ampolu',
    headshot: '/assets/images/authors/author-dp.png',
    bio: 'AI Engineer specializing in LLMs and building  applications',
    socials: [
      {
        platform: 'linkedin',
        url: 'https://www.linkedin.com/in/yaswanth-ampolu-a2b110238/',
        label: 'LinkedIn'
      }
    ]
  }
}

export function resolveBlogAuthor(blogData: { author_id?: string; author?: BlogAuthorOverride }): BlogAuthor {
  const authorId = blogData.author_id || blogData.author?.id || DEFAULT_AUTHOR_ID
  const fromDirectory = BLOG_AUTHORS[authorId] || BLOG_AUTHORS[DEFAULT_AUTHOR_ID]

  if (!blogData.author) {
    return fromDirectory
  }

  return {
    ...fromDirectory,
    id: blogData.author.id || fromDirectory.id,
    name: blogData.author.name || fromDirectory.name,
    headshot: blogData.author.headshot || fromDirectory.headshot,
    bio: blogData.author.bio || fromDirectory.bio,
    socials: blogData.author.socials || fromDirectory.socials
  }
}
