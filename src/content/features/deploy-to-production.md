---
top_section:
  title: "Deploy Apps to Production"
  description: Move from development to production seamlessly. No environment drift, no missing dependencies, no surprises.
  button:
    label: "Get Started"
    href: "https://app.dataflow.zone"
  hero_image: "/assets/images/product/deploy-apps.webp"

seamless_deployment:
  title: "From Development to Production, Instantly"
  description: "Deploying applications shouldn't require rebuilding environments, rewriting configurations, or debugging version mismatches. With Dataflow, what you develop is exactly what runs in production."
  button:
    label: "Deploy an App"
    href: "https://app.dataflow.zone"
    target: '_blank'
  features:
    - title: "One-Click Deployment"
      description: "Push your application to production with a single click. No manual steps, no deployment scripts."
      image: "/assets/icons/icon-click-deploy.svg"
    - title: "Instant Sharing"
      description: "Once deployed, share applications with your team or customers instantly via a secure URL."
      image: "/assets/icons/icon-share-link.svg"
    - title: "Zero Environment Drift"
      description: "The environment you used in development is the exact same one running in production. Byte-for-byte identical."
      image: "/assets/icons/icon-equal-env.svg"
    - title: "Auto-Scaling"
      description: "Production apps automatically scale based on demand. No manual capacity planning required."
      image: "/assets/icons/icon-deploy-autoscale.svg"

production_parity:
  title: "Production Parity by Design"
  description: "Traditional workflows have separate environments for development, staging, and production. This creates drift, bugs, and debugging nightmares. Dataflow eliminates that by using the same immutable environment everywhere."
  image: "/assets/images/product/production-parity-design.webp"
  imageSide: "left"
  callout: "Because development and production use the exact same containerized environment, you eliminate an entire class of deployment bugs."

managed_secrets_in_production:
  title: "Secrets and Connections, Managed Automatically"
  description: "In traditional deployments, you have to manually configure production credentials, update environment variables, and ensure secrets don't leak into logs. Dataflow handles this for you."
  features:
    - title: "Environment-Specific Secrets"
      description: "Define separate credentials for dev, staging, and production. Apps automatically use the correct ones based on environment."
      image: "/assets/icons/icon-deploy-env.svg"
    - title: "Secure by Default"
      description: "Production secrets are encrypted at rest and in transit. Never exposed in code or logs."
      image: "/assets/icons/icon-deploy-secure.svg"
    - title: "Audit Logs"
      description: "Full audit trail of who accessed which secret and when. Built for compliance."
      image: "/assets/icons/icon-deploy-audit.svg"
    - title: "No Manual Configuration"
      description: "Secrets configured in the platform are automatically available to deployed applications. No .env files to manage."
      image: "/assets/icons/icon-deploy-autoconfig.svg"

comparison:
  heading: "Traditional Deployment vs. Dataflow"
  leftHeading: "Traditional Deployment"
  rightHeading: "Dataflow"
  rows:
    - leftTitle: "Rebuild Environments:"
      leftText: "Build separate Docker images for dev and production. Hope dependencies match."
      rightTitle: "Same Environment:"
      rightText: "Development environment is the production environment. Zero rebuild required."
    - leftTitle: "Manually Configure Secrets:"
      leftText: "Set environment variables in Kubernetes, update .env files, manage AWS Secrets Manager."
      rightTitle: "Auto-Configured:"
      rightText: "Secrets are centrally managed and automatically injected into production apps."
    - leftTitle: "Write Deployment Scripts:"
      leftText: "CI/CD YAML files, Terraform configs, and custom deployment scripts."
      rightTitle: "One-Click Deploy:"
      rightText: "Click deploy. Dataflow handles the rest."
    - leftTitle: "Manual Scaling:"
      leftText: "Set up load balancers, configure autoscaling groups, monitor capacity."
      rightTitle: "Auto-Scaling:"
      rightText: "Apps automatically scale based on traffic. No configuration needed."

deployment_without_tooling:
  title: "Production-Ready Without Extra Tooling"
  description: "Traditional production deployments require CI/CD pipelines, container orchestration, and infrastructure management. Dataflow abstracts that complexity while giving you full control."

confidence_in_shipping:
  title: "Ship With Confidence"
  description: "Deployment shouldn't be stressful. With Dataflow, you know exactly what's running in production because it's the same environment you tested locally."
  features:
    - title: "No Surprises"
      description: "What works in development works in production. No \"it worked on my machine\" bugs."
      image: "/assets/icons/icon-no-surprise.svg"
    - title: "Instant Rollbacks"
      description: "Something went wrong? Roll back to the previous environment version instantly. Every deployment is versioned."
      image: "/assets/icons/icon-rollback.svg"
    - title: "Built-In Monitoring"
      description: "Production applications include built-in logging and monitoring. See what's happening in real time."
      image: "/assets/icons/icon-monitor-chart.svg"
    - title: "Secure by Default"
      description: "Deployed apps run in isolated containers with scoped permissions. Zero trust security model."
      image: "/assets/icons/icon-zero-trust.svg"

auto_scaling_support:
  title: "Auto-Scaling for Production Workloads"
  description: "Production applications need to handle variable traffic. Dataflow automatically scales compute resources up or down based on demand, so you never overpay or under-provision."
  features:
    - title: "Traffic-Based Scaling"
      description: "Apps scale up during high traffic and scale down during low usage. No manual intervention."
      image: "/assets/icons/icon-traffic-scale.svg"
    - title: "Cost Optimization"
      description: "Pay only for the compute you use. Auto-scaling ensures you're not paying for idle resources."
      image: "/assets/icons/icon-cost-down.svg"
    - title: "Zero Downtime"
      description: "Scaling happens seamlessly without interrupting service. Users never see downtime."
      image: "/assets/icons/icon-uptime.svg"

deployment_workflow_example:
  title: "Example: Deploying a Streamlit Dashboard"
  steps:
    - step: "1. Build in Development"
      description: "Develop a Streamlit app in Dataflow's VS Code or Jupyter. Test it with real data connections."
    - step: "2. Click Deploy"
      description: "Once ready, click the Deploy button. Dataflow packages the app with the exact environment you used."
    - step: "3. Automatic Configuration"
      description: "Production secrets (e.g., database credentials) are automatically injected. No manual setup."
    - step: "4. App Goes Live"
      description: "Your app is live at a secure URL. Share it with your team or embed it in your product."
    - step: "5. Auto-Scaling Active"
      description: "As traffic grows, Dataflow automatically scales compute resources. You don't do anything."
---
