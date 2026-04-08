---
seo:
  title: "One Shared Python Environment for Your Whole Data Team | Dataflow"
  description: "Define your environment once sync it automatically across notebooks, pipelines and dashboards. Manage secrets, connections & RBAC from a single foundation."

top_section:
  title: "One Foundation, Shared Everywhere"
  description: A common platform layer across all applications. Shared environments, unified configuration, and zero duplication.
  button:
    label: "Get Started"
    href: "https://app.dataflow.zone"
  hero_image: "/assets/images/product/define-once-use-everywhere.webp"

shared_platform_layer:
  title: "What Is a Shared Foundation?"
  description: "Instead of managing separate configurations for each application, Dataflow provides a single foundation that all apps share. Environments, secrets, connections, and configurations are defined once and available everywhere."
  button:
    label: "See How It Works"
    href: "https://app.dataflow.zone"
    target: '_blank'
  features:
    - title: "Shared Python Environments"
      description: "The same managed environment is available in VS Code, Jupyter, Airflow, and deployed apps. Built on the Managed Dependencies system."
      image: "/assets/icons/icon-python-logo.svg"
      link: "/product/managed-dependencies"
      linkText: "Learn about Managed Dependencies"
    - title: "Unified Secrets & Credentials"
      description: "API keys and database passwords stored in one secure vault. Accessible across all applications automatically."
      image: "/assets/icons/icon-key-vault.svg"
    - title: "Common Database Connections"
      description: "Define database connections once. Available instantly in Airflow DAGs, Jupyter notebooks, and VS Code."
      image: "/assets/icons/icon-database-link.svg"
    - title: "Platform-Wide Configuration"
      description: "Environment variables, access controls, and project settings managed centrally, enforced consistently."
      image: "/assets/icons/icon-sf-config.svg"

built_on_managed_dependencies:
  title: "Built on Managed Dependencies"
  description: "The Shared Foundation relies on Dataflow's Managed Dependencies system. This ensures that every application in your workspace uses the exact same Python environment—no drift, no surprises."
  image: "/assets/images/product/define-once-share-everywhere.webp"
  link: "/product/managed-dependencies"
  linkText: "Learn more about Managed Dependencies"
  imageSide: "left"
  callout: "Because all apps share the same dependency foundation, you never have to worry about version mismatches between your local development environment and production."

comparison:
  heading: "Without vs. With Shared Foundation"
  leftHeading: "Separate Configurations"
  rightHeading: "Shared Foundation"
  rows:
    - leftTitle: "Environment Duplication:"
      leftText: "Manage separate Python environments for VS Code, Airflow, and Jupyter. Hope they stay in sync."
      rightTitle: "Single Environment:"
      rightText: "One managed environment, shared across all apps. Guaranteed consistency."
    - leftTitle: "Credential Sprawl:"
      leftText: "Copy .env files into each application. Update passwords in 5 places when they rotate."
      rightTitle: "Central Vault:"
      rightText: "Define credentials once. All apps pull from the same secure vault automatically."
    - leftTitle: "Configuration Drift:"
      leftText: "Different settings in each app. Hard to debug when something works in one place but not another."
      rightTitle: "Unified Config:"
      rightText: "Platform-level settings enforced consistently. No surprises."

why_shared_foundation_matters:
  title: "Why a Shared Foundation Matters"
  description: "Managing configurations separately for each application leads to duplication, inconsistency, and maintenance overhead. A shared foundation eliminates that."

key_benefits:
  title: "Benefits of a Shared Foundation"
  description: "Reduce duplication, improve stability, and simplify maintenance with a unified platform layer."
  features:
    - title: "Zero Duplication"
      description: "Define environments, secrets, and connections once. Never copy-paste configuration across apps again."
      image: "/assets/icons/icon-sf-duplication.svg"
    - title: "Platform-Wide Consistency"
      description: "All applications use the same foundation. Dependency versions, credentials, and settings are enforced platform-wide."
      image: "/assets/icons/icon-sf-consistency.svg"
    - title: "Reduced Maintenance"
      description: "Update a secret or environment in one place, and it propagates to all apps automatically. No manual syncing."
      image: "/assets/icons/icon-sf-maintenance.svg"
    - title: "Faster Debugging"
      description: "Because all apps share the same foundation, you eliminate an entire class of \"it works here but not there\" bugs."
      image: "/assets/icons/icon-sf-debug.svg"
    - title: "Team Alignment"
      description: "Everyone on the team uses the same environments and credentials. No onboarding friction or configuration drift."
      image: "/assets/icons/icon-sf-alignment.svg"
    - title: "Built for Stability"
      description: "The shared foundation is built on immutable, versioned environments. Roll back changes instantly if needed."
      image: "/assets/icons/icon-sf-stability.svg"

