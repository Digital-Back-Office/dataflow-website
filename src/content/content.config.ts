import { defineCollection, z } from 'astro:content'

// Blog Collection Schema
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

// Solution Pages Schema (Enterprise, Startups-SMEs, Personal)
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
  })),
  cta_section: z.object({
    title: z.string(),
    description: z.string(),
    button: z.object({
      text: z.string(),
      href: z.string()
    }),
    secondary_button: z.object({
      text: z.string(),
      href: z.string()
    }).optional(),
    note: z.union([z.string(), z.array(z.string())]).optional()
  }).optional()
})

const startupsSmesCollection = defineCollection({
  type: 'content',
  schema: solutionSchema
})

const personalCollection = defineCollection({
  type: 'content',
  schema: solutionSchema
})

const enterpriseCollection = defineCollection({
  type: 'content',
  schema: solutionSchema
})

// Common Collection Schema (Testimonials, Supported By, Header/Footer, Forms)
const commonCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Common.md - Testimonials and Supported By
    testimonials: z.object({
      title: z.string(),
      subtitle: z.string(),
      testimonials: z.array(z.object({
        name: z.string(),
        role: z.string(),
        company: z.string(),
        text: z.string()
      }))
    }).optional(),
    supported_by: z.object({
      title: z.string(),
      incubators: z.array(z.object({
        name: z.string(),
        logo: z.string()
      }))
    }).optional(),

    // Header-Footer.md
    header: z.object({
      logo: z.object({
        href: z.string(),
        image: z.string(),
        alt: z.string()
      }),
      nav: z.object({
        desktop: z.array(z.object({
          label: z.string(),
          type: z.string(),
          href: z.string().optional(),
          width: z.string().optional(),
          columns: z.array(z.object({
            heading: z.string(),
            span: z.number().optional(),
            items: z.array(z.object({
              title: z.string(),
              description: z.string(),
              href: z.string().optional(),
              action: z.string().optional()
            }))
          })).optional(),
          items: z.array(z.object({
            title: z.string(),
            description: z.string(),
            href: z.string()
          })).optional()
        }))
      }),
      ctas: z.object({
        primary: z.object({
          label: z.string(),
          href: z.string(),
          target: z.string().optional()
        }),
        secondary: z.object({
          label: z.string(),
          href: z.string()
        })
      })
    }).optional(),
    footer: z.object({
      finance: z.string(),
      finance_underline: z.string(),
      description: z.string(),
      copyrights: z.string(),
      sections: z.array(z.object({
        heading: z.string(),
        links: z.array(z.object({
          label: z.string(),
          href: z.string()
        }))
      })),
      bottom_bar: z.object({
        links: z.array(z.object({
          label: z.string(),
          href: z.string()
        }))
      }),
      social_links: z.array(z.object({
        platform: z.string(),
        url: z.string(),
        icon: z.string()
      }))
    }).optional(),

    // Book Demo Form
    hero: z.object({
      title: z.string(),
      subtitle: z.string().optional()
    }).optional(),
    highlights: z.array(z.object({
      image: z.string(),
      title: z.string(),
      description: z.string()
    })).optional(),

    // Contact Us and Start Free Trial Forms
    title: z.string().optional(),
    title1: z.string().optional(),
    title2: z.string().optional(),
    description: z.union([z.string(), z.array(z.string())]).optional(),
    form: z.object({
      label1: z.string().optional(),
      placeholder1: z.string().optional(),
      label2: z.string().optional(),
      placeholder2: z.string().optional(),
      label3: z.string().optional(),
      placeholder3: z.string().optional(),
      label4: z.string().optional(),
      placeholder4: z.string().optional(),
      label5: z.string().optional(),
      placeholder5: z.string().optional(),
      label6: z.string().optional(),
      placeholder6: z.string().optional(),
      terms: z.string().optional(),
      link: z.string().optional(),
      button: z.string().optional(),
      fields: z.array(z.object({
        name_attr: z.string(),
        label: z.string(),
        placeholder: z.string(),
        type: z.string(),
        id: z.string().optional(),
        options: z.array(z.object({
          label: z.string(),
          value: z.string()
        })).optional()
      })).optional()
    }).optional()
  })
})

// Company Collection Schema
const companyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    top_section: z.object({
      title: z.string(),
      description: z.string(),
      tagline: z.array(z.object({
        text: z.string(),
        isHighlighted: z.boolean()
      }))
    }),
    journey: z.object({
      title: z.string(),
      description: z.string()
    }),
    team_members: z.object({
      title: z.string(),
      button: z.string(),
      members: z.array(z.object({
        name: z.string(),
        position: z.string(),
        photo: z.string()
      }))
    }),
    join_our_team: z.object({
      title: z.string(),
      subtitle: z.string(),
      heading: z.string(),
      description: z.string(),
      button: z.object({
        label: z.string(),
        href: z.string(),
        hrefTarget: z.string()
      })
    }),
    empower_your_journey: z.object({
      title: z.string(),
      features: z.array(z.object({
        title: z.string(),
        description: z.string(),
        image: z.string()
      }))
    })
  })
})

// Home Collection Schema
const homeCollection = defineCollection({
  type: 'content',
  schema: z.object({
    hero: z.object({
      title: z.string(),
      title_part_2: z.string(),
      description: z.string(),
      subtitle: z.string(),
      primary_cta: z.object({
        text: z.string(),
        href: z.string(),
        target: z.string()
      }),
      secondary_cta: z.object({
        text: z.string(),
        href: z.string()
      }),
      cta_button: z.string(),
      badges: z.array(z.string()),
      supported_by: z.array(z.object({
        name: z.string(),
        logo: z.string()
      }))
    }),
    tools: z.object({
      title: z.string(),
      tool_items: z.array(z.object({
        name: z.string(),
        src: z.string()
      }))
    }),
    how_it_works: z.object({
      title: z.string(),
      steps: z.array(z.object({
        title: z.string(),
        description_1: z.string(),
        description_2: z.string(),
        image: z.string()
      }))
    }),
    features: z.object({
      title: z.string(),
      subtitle: z.string(),
      features: z.array(z.object({
        title: z.string(),
        description: z.string(),
        cta_text: z.string().optional(),
        icon: z.string(),
        image: z.string().optional(),
        href: z.string(),
        color: z.object({
          normal: z.string(),
          hover: z.string()
        }).optional()
      }))
    }),
    use_cases: z.object({
      title: z.string(),
      use_cases: z.array(z.object({
        id: z.string(),
        title: z.string(),
        heading: z.string(),
        description: z.string(),
        features: z.array(z.string()),
        link: z.string(),
        cta_text: z.string(),
        image: z.string(),
        video: z.string(),
        imageAlt: z.string()
      }))
    }),
    ship_apps_faster: z.object({
      title: z.string(),
      subtitle: z.string(),
      steps: z.array(z.object({
        number: z.number(),
        title: z.string(),
        description: z.string(),
        bullets: z.array(z.string()),
        icon: z.string(),
        image: z.string()
      }))
    }),
    enterprise: z.object({
      title: z.string(),
      description: z.string(),
      cards: z.array(z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string()
      }))
    }),
    support_section: z.object({
      title: z.string(),
      subtitle: z.string(),
      items: z.array(z.object({
        title: z.string(),
        description: z.string(),
        bullets: z.array(z.string())
      }))
    }),
    gpu_compute: z.object({
      title: z.string(),
      lines: z.array(z.string()),
      primary_cta: z.object({
        text: z.string(),
        href: z.string()
      }),
      secondary_cta: z.object({
        text: z.string(),
        href: z.string()
      })
    }),
    developers_love: z.object({
      title: z.string(),
      subtitle: z.string(),
      cards: z.array(z.object({
        title: z.string(),
        description: z.string(),
        links: z.array(z.object({
          text: z.string(),
          href: z.string(),
          target: z.string().optional()
        })).optional(),
        actions: z.array(z.object({
          text: z.string(),
          onclick: z.string().optional(),
          href: z.string().optional()
        })).optional()
      }))
    }),
    cta: z.object({
      title: z.string(),
      description: z.string(),
      cta_button_1: z.string(),
      cta_button_2: z.string()
    }),
    LearnMoreBtn: z.string(),
    ViewMoreButton: z.string()
  })
})

// Promotion Collection Schema
const promotionCollection = defineCollection({
  type: 'content',
  schema: z.object({
    meta: z.object({
      title: z.string()
    }),
    hero: z.object({
      badge: z.string(),
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
      primary_cta: z.object({
        label: z.string(),
        href: z.string()
      }),
      pill_badges: z.array(z.string()),
      card: z.object({
        label: z.string(),
        value: z.string(),
        description: z.string()
      }),
      mini_left: z.object({
        title: z.string(),
        subtitle: z.string()
      }),
      mini_right: z.object({
        title: z.string()
      }),
      review_time: z.object({
        title: z.string(),
        subtitle: z.string()
      }),
      limited_time: z.object({
        title: z.string(),
        subtitle: z.string()
      })
    }),
    stats: z.array(z.object({
      label: z.string(),
      value: z.string()
    })),
    who_for: z.array(z.string()),
    what_is_it: z.object({
      eyebrow: z.string(),
      title: z.string(),
      description: z.string()
    }),
    benefits: z.object({
      eyebrow: z.string(),
      title: z.string(),
      description: z.string(),
      items: z.array(z.string())
    }),
    application: z.object({
      eyebrow: z.string(),
      title: z.string(),
      description: z.string()
    }),
    referral: z.object({
      eyebrow: z.string(),
      title: z.string(),
      description: z.string(),
      cta: z.object({
        label: z.string(),
        href: z.string()
      }),
      steps: z.array(z.string()),
      how_it_works_title: z.string(),
      how_it_works: z.array(z.object({
        title: z.string(),
        description: z.string()
      }))
    }),
    faq: z.object({
      eyebrow: z.string(),
      title: z.string(),
      description: z.string(),
      items: z.array(z.object({
        q: z.string(),
        a: z.string()
      }))
    }),
    final_cta: z.object({
      kicker: z.string(),
      title: z.string(),
      description: z.string(),
      primary_cta: z.object({
        label: z.string(),
        href: z.string()
      })
    })
  })
})

// Features Collection Schema
const featuresCollection = defineCollection({
  type: 'content',
  schema: z.object({
    top_section: z.object({
      title: z.string(),
      description: z.string(),
      button: z.object({
        label: z.string(),
        href: z.string()
      }),
      hero_image: z.string(),
      company_logos: z.object({
        title: z.string(),
        logos: z.array(z.object({
          image: z.string(),
          alt: z.string()
        }))
      }).optional()
    }),
    
    // Manage Data Connections specific
    comparison: z.object({
      heading: z.string(),
      leftHeading: z.string(),
      rightHeading: z.string(),
      rows: z.array(z.object({
        leftTitle: z.string(),
        leftText: z.string(),
        rightTitle: z.string(),
        rightText: z.string()
      }))
    }).optional(),
    why_data_connection_matters: z.object({
      title: z.string(),
      description: z.string(),
      features: z.array(z.object({
        title: z.string(),
        description: z.string(),
        image: z.string()
      }))
    }).optional(),
    grow_together_managing_connections: z.object({
      title: z.string(),
      description: z.string(),
      button: z.object({
        label: z.string(),
        href: z.string()
      })
    }).optional(),
    core_features: z.object({
      title: z.string(),
      description: z.string(),
      button: z.object({
        label: z.string(),
        href: z.string()
      }),
      features: z.array(z.object({
        title: z.string(),
        description: z.string(),
        image: z.string()
      }))
    }).optional(),

    // Python Dependency Hell specific
    section: z.object({
      title: z.string(),
      description: z.string(),
      image: z.string(),
      button: z.object({
        label: z.string(),
        href: z.string()
      }),
      imageSide: z.string()
    }).optional(),
    simplify_dependency_management: z.object({
      title: z.string(),
      description: z.string(),
      button: z.object({
        label: z.string(),
        href: z.string()
      }),
      features: z.array(z.object({
        title: z.string(),
        description: z.string(),
        image: z.string()
      }))
    }).optional(),

    // Run Data on Any Cloud specific
    benefits: z.object({
      title: z.string(),
      description: z.string(),
      features: z.array(z.object({
        title: z.string(),
        description: z.string(),
        image: z.string()
      }))
    }).optional(),
    core_capabilities: z.object({
      title: z.string(),
      description: z.string(),
      button: z.object({
        label: z.string(),
        href: z.string()
      }),
      features: z.array(z.object({
        title: z.string(),
        description: z.string(),
        image: z.string()
      }))
    }).optional(),
    cloud_providers: z.object({
      title: z.string(),
      cloud_providers: z.array(z.object({
        title: z.string(),
        logo: z.string(),
        link: z.string(),
        image: z.string()
      }))
    }).optional(),
    private_cloud: z.object({
      title: z.string(),
      description: z.string(),
      features: z.array(z.object({
        title: z.string(),
        description: z.string(),
        image: z.string()
      })),
      feature1: z.object({
        title: z.string(),
        description: z.string()
      }).optional(),
      feature2: z.object({
        title: z.string(),
        description: z.string()
      }).optional()
    }).optional()
  })
})

export const collections = {
  blogs: blogsCollection,
  'startups-smes': startupsSmesCollection,
  personal: personalCollection,
  enterprise: enterpriseCollection,
  common: commonCollection,
  company: companyCollection,
  home: homeCollection,
  promotion: promotionCollection,
  features: featuresCollection
}
