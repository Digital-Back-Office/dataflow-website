---
seo:
  title: "Managed Python Dependencies | No More pip Errors | Dataflow"
  description: "Dataflow creates containerised, immutable Python environments in one click. Share across Jupyter, Airflow & VS Code seamlessly."

top_section:
  title: "Managed Python Dependencies / No More pip Errors or Version Conflicts"
  description: No more version conflicts, broken environments, or "works on my machine" problems. Get shared, reproducible Python environments that just work—for everyone, every time.
  button:
    label: 'Get Started'
    href: "https://app.dataflow.zone"
  hero_image: "/assets/images/product/goodbye-dependency-hell.webp"

problem_section:
  title: "Dependency Hell Is Real"
  description: "If you've ever spent hours debugging version conflicts, rewriting requirements.txt, or rebuilding virtual environments from scratch, you know the pain. Python's dependency ecosystem is powerful, but fragile."
  problems:
    - title: "Version Conflicts"
      description: "Package A needs pandas 1.5, Package B needs pandas 2.0. Pick one and something breaks."
      image: "/assets/icons/icon-warning.svg"
    - title: "\"Works on My Machine\""
      description: "Your local setup is different from staging, which is different from production. Good luck debugging."
      image: "/assets/icons/icon-laptop-cross.svg"
    - title: "Environment Drift"
      description: "Over time, your local environment diverges from the team's. Reproducibility becomes a guessing game."
      image: "/assets/icons/icon-drift.svg"
    - title: "Manual Maintenance"
      description: "Managing multiple virtual environments, conda envs, or Docker images across projects is tedious and error-prone."
      image: "/assets/icons/icon-tools-wrench.svg"

solution_section:
  title: "Shared Python Environments That Just Work"
  description: "Dataflow manages dependencies for you. Define your requirements once, and the platform builds an immutable, containerized environment that every team member—and every application—uses."
  image: "/assets/images/product/define-once-share-everywhere.webp"
  button:
    label: "Get Started"
    href: "https://app.dataflow.zone"
    target: '_blank'
  imageSide: "left"

how_it_works:
  title: "How It Works"
  description: "Dataflow automates the entire dependency management process, from resolution to deployment."
  features:
    - step: "Define Requirements"
      description: "Specify your Python version and packages. No need to manually resolve dependencies."
    - step: "Automatic Resolution"
      description: "Dataflow resolves the full dependency tree, checking PyPI for compatible versions and detecting conflicts before build."
    - step: "Immutable Build"
      description: "Once built, the environment is locked and containerized. Every user and application gets the exact same binary."
    - step: "Instant Activation"
      description: "The environment is available across your entire workspace—VS Code, Jupyter, Airflow, and all deployed apps."

key_benefits:
  title: "Why Managed Dependencies Matter"
  description: "Stop wasting time on environment setup. Focus on building data pipelines and applications instead."
  button:
    label: "Get Started"
    href: "https://app.dataflow.zone"
    target: '_blank'
  features:
    - title: "Zero Local Setup"
      description: "No virtualenv, no conda, no Docker. Everything runs in the cloud with zero configuration."
      image: "/assets/icons/icon-md-zero-setup.svg"
    - title: "Version Rollback"
      description: "Broke your environment? Roll back to the last working build instantly. Every environment snapshot is versioned and stored."
      image: "/assets/icons/icon-md-rollback.svg"
    - title: "Production Parity"
      description: "The environment you use in development is the exact same one running in production. No surprises."
      image: "/assets/icons/icon-md-parity.svg"
    - title: "Team Consistency"
      description: "Everyone on the team uses the same environment automatically. No more onboarding delays or broken local setups."
      image: "/assets/icons/icon-md-team.svg"
    - title: "Project Isolation"
      description: "Each project gets its own isolated environment. Work on Python 3.9 and 3.12 projects side-by-side without conflicts."
      image: "/assets/icons/icon-md-isolation.svg"
    - title: "Security & Compliance"
      description: "Dependencies are locked to specific hashes from PyPI. You know exactly what's running and can audit every package."
      image: "/assets/icons/icon-md-security.svg"
---
