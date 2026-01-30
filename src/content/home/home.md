---
hero:
  title: "Focus on Data Logic, <br> Not Glue Code."
  title_part_2: "Not Glue Code."
  description: All your data tools, finally working together—without breaking environments. <br>
        AI ready and Open source tools.
  subtitle: "All your data tools, finally working together—without breaking environments. AI ready and open-source friendly."
  primary_cta:
    text: "Try it free"
    href: "https://app.dataflow.zone/hub/login"
    target: "_blank"
  secondary_cta:
    text: "Talk to us"
    href: "/book-demo"
  cta_button: 30 mins FREE Consultation
  badges:
    - "No card required"
    - "Free consultation"
  supported_by:
    - name: "Google Cloud"
      logo: "/assets/images/googlecloudlogo.webp"
    - name: "AWS"
      logo: "/assets/images/aws-logo.webp"
    - name: "NatWest"
      logo: "/assets/images/nat-west-logo.webp"
    - name: "NVIDIA"
      logo: "/assets/images/nvidia-logo.webp"
    - name: "Barclays"
      logo: "/assets/images/barclays-logo.webp"

tools:
  title: "Native integration with the tools"
  tool_items:
    - name: "Jupyter"
      src: "/assets/images/apps/jupyterlogofull.webp"
    - name: "ML Flow"
      src: "/assets/images/apps/mlflowlogofull.webp"
    - name: "Streamlit"
      src: "/assets/images/apps/streamlit-logo.webp"
    - name: "VS Code"
      src: "/assets/images/apps/vs-code-logo.webp"
    - name: "Dash"
      src: "/assets/images/apps/dash-app-logo.webp"

how_it_works:
  title: "How it works?"
  steps:
    - title: Define Your Environment. Once.
      description_1: Forget managing 15 different requirements.txt files and resolving Docker conflicts.
      description_2: Create one environment. It syncs automatically across Airflow, your IDE, and all your data apps within Dataflow.
      image: "/assets/images/how-it-works/placeholder.webp"

    - title: Code within Dataflow
      description_1: A fully persistent workspace with VS Code or Jupyter Notebook. No manual .env files—your secrets and connections are pre-injected.
      description_2: Securely create connections (SQL, S3, Snowflake, etc) and secrets once. Access them instantly in your code using the Dataflow Python library.
      image: "/assets/images/how-it-works/placeholder.webp"

    - title: Schedule with Airflow. Zero Config.
      description_1: Launch Airflow with your DAGs in a few clicks. Use standard Airflow exactly as you know it—no proprietary syntax, no changed core functionality.
      description_2: All your connections, secrets, and Python environments are already synced.
      image: "/assets/images/how-it-works/placeholder.webp"

    - title: Visualize Your Data
      description_1: Build interactive data apps using Streamlit or Dash. Seamlessly pull data using your existing Dataflow connections.
      description_2: ""
      image: "/assets/images/how-it-works/placeholder.webp"

    - title: Deploy & Share
      description_1: Deploy applications in one click. We use the exact same Python environment from your workspace, ensuring the app works in production exactly as it did in workspace.
      description_2: Supports deploying projects created within Dataflow or imported from external sources.
      image: "/assets/images/how-it-works/placeholder.webp"

features:
  title: "Essential Features"
  subtitle: "Unlock the power of streamlined development and seamless collaboration."
  features:
    - title: Define Once, Use Everywhere
      description: Unleash your creativity with the Dataflow platform. Customize and optimize solutions to reflect your unique approach, transforming the cloud data landscape and demonstrating your own distinctive methods.
      cta_text: Learn more
      icon: "/assets/icons/icon-compass.svg"
      image: /assets/images/runanycloud.webp
      href: /manage-your-data-connections
      color: { normal: "#FBE2F0", hover: "#D40F7D" }

    - title: Goodbye, Dependency Hell
      description: No more pip install errors or dependency issues. Dataflow allows you to create, manage, and share custom Python environments with a single click. Whether you are building legacy data pipelines or cutting-edge GenAI models, your dependencies are containerized, portable, and immutable. Focus on your code, not your config files.
      cta_text: Learn more
      icon: "/assets/icons/icon-link-attached.svg"
      href: /say-goodbye-to-python-dependency-hell

    - title: Run on Any Cloud
      description: Deploy Dataflow on AWS, Google Cloud, Azure, or your private on-premise cloud. Spin up persistent workspaces with the exact compute power you need—from standard CPUs to high-performance GPUs—and never worry about losing your work.
      cta_text: Learn more
      icon: "/assets/icons/icon-cloud-with-links.svg"
      href: /run-dataflow-on-any-cloud

    - title: Share Apps Instantly
      description: Turn your notebooks and scripts into live, shareable URLs in minutes. Forget complex Dockerfiles and CI/CD pipelines—Dataflow automates the entire production deployment process. You build the logic; we handle the DevOps.
      cta_text: Learn more
      icon: "/assets/icons/icon-forward.svg"
      href: /say-goodbye-to-python-dependency-hell

    - title: Bring your team in one place
      description: Scale securely with robust governance. Manage permissions via RBAC, audit actions with comprehensive logs, and share environments across teams without exposing sensitive credentials.
      cta_text: Learn more
      icon: "/assets/icons/icon-people-with-tick.svg"
      href: /manage-your-data-connections

use_cases:
  title: "Built for All Data Use Cases"
  use_cases:
    - id: "exploration"
      title: "Data Exploration"
      heading: "Explore Your Data Interactively"
      description: "Dive deep into your data with Jupyter notebooks and interactive tools. Query, visualize, and understand your datasets with powerful exploration capabilities."
      features:
        - "Interactive Jupyter notebooks with persistent workspaces"
        - "Pre-configured connections to all your data sources"
        - "Real-time collaboration with your team"
      link: "/manage-your-data-connections"
      cta_text: "Learn more"
      image: "/assets/images/app-screenshots/dashboard.webp"
      video: "/assets/videos/jupyter.mp4"
      imageAlt: "Data Exploration"

    - id: "etl"
      title: "ETL"
      heading: "Orchestrate Data Pipelines"
      description: "Schedule and manage ETL workflows with Airflow. Transform and load data across your entire stack with zero configuration overhead."
      features:
        - "Native Airflow with auto-synced environments"
        - "DBT integration for data transformations"
        - "Unified connection management across all pipelines"
      link: "/manage-your-data-connections"
      cta_text: "Learn more"
      image: "/assets/images/app-screenshots/dashboard.webp"
      video: "/assets/videos/airflow.mp4"
      imageAlt: "ETL"

    - id: "visualisation"
      title: "Data Visualisation"
      heading: "Create Stunning Visualizations"
      description: "Build interactive dashboards and visualizations with Streamlit, Dash, and other powerful tools. Share insights with stakeholders effortlessly."
      features:
        - "Deploy Streamlit and Dash apps with one click"
        - "Instant access to live data connections"
        - "Share dashboards via secure URLs"
      link: "/apps"
      cta_text: "Learn more"
      video: "/assets/videos/data-visualisation.webm"
      image: "/assets/images/app-screenshots/dashboard.webp"
      imageAlt: "Data Visualisation"

    - id: "analytics"
      title: "Analytics"
      heading: "Advanced Analytics & ML"
      description: "Build and deploy machine learning models with MLflow. Run complex analytics pipelines with all the tools you need in one place."
      features:
        - "MLflow integration for model tracking and deployment"
        - "GPU support for deep learning workloads"
        - "Reproducible experiments with environment management"
      link: "/manage-your-data-connections"
      cta_text: "Learn more"
      video: "/assets/videos/analysis.webm"
      image: "/assets/images/app-screenshots/dashboard.webp"
      imageAlt: "Analytics"

ship_apps_faster:
  title: "Ship data apps in a single flow."
  subtitle: "Dataflow removes environment chaos and glue code across notebooks, pipelines, and apps."
  steps:
    - number: 1
      title: "Define"
      description: "Define environment packages and connections once."
      bullets:
        - "Connect databases, APIs, and cloud storage."
        - "Manage environment variables and secrets."
        - "Sync automatically across your entire stack."
      icon: "/assets/icons/clipboard.svg"
      image: "/assets/images/how-it-works/define.webp"

    - number: 2
      title: "Develop"
      description: "Code in persistent IDEs like VS Code and Jupyter."
      bullets:
        - "Access pre-configured connections instantly."
        - "Build pipelines, ML models, and dashboards."
        - "Schedule Airflow jobs with zero manual config."
      icon: "/assets/icons/code.svg"
      image: "/assets/images/how-it-works/develop.webp"

    - number: 3
      title: "Deploy"
      description: "Launch apps and APIs with one-click deployment."
      bullets:
        - "Ensure dev-to-prod parity automatically."
        - "Convert notebooks into live production APIs."
        - "Eliminate Dockerfiles and CI/CD management."
      icon: "/assets/icons/upload-cloud.svg"
      image: "/assets/images/how-it-works/deploy.webp"

enterprise:
  title: "Enterprise-Ready from Day One"
  description: "Security, compliance, and reliability built into every layer—so you can trust your data ops at scale."
  cards:
    - title: "Scale Operations"
      description: "Run thousands of jobs on auto-scaled infrastructure. No DevOps team needed to manage Kubernetes or cloud resources."
      icon: "/assets/icons/icon-shield.svg"
    - title: "Audit-Ready"
      description: "Complete audit logs for compliance. Track who changed what, when—from code deployments to data access."
      icon: "/assets/icons/icon-headset.svg"
    - title: "Secure Access"
      description: "SSO integration, secret encryption. Share environments without exposing credentials."
      icon: "/assets/icons/icon-cloud.svg"

support_section:
  title: "We've Got Your Back"
  subtitle: "Get the support you need, when you need it—so your team can stay focused on building great data products."
  items:
    - title: "24/7 Support"
      description: "Round-the-clock assistance from our expert team. Whether it's a critical bug or a quick question, we're here to help—anytime, anywhere."
      bullets:
        - Live chat support
        - Email ticketing system
        - Dedicated Discord channel
    - title: "On-Demand Feature Support"
      description: "Need a custom integration or feature? We build what you need—fast. Our team collaborates with yours to extend Dataflow's capabilities."
      bullets:
        - Custom connector development
        - Priority feature requests
        - Dedicated engineering support

gpu_compute:
  title: "Build & Run AI/ML Models on GPU-Powered Instances"
  lines:
    - "Access powerful GPU-accelerated compute for your AI/ML workloads."
    - "Provision managed GPU workspaces in one click—no infrastructure complexity."
    - "Scale from experimentation to production with flexible GPU resources."
  primary_cta:
    text: "Get Started"
    href: "/start-free-trail"
  secondary_cta:
    text: "Talk to an Expert"
    href: "/book-demo"

developers_love:
  title: "Developers love Dataflow"
  subtitle: "Join a growing community of data engineers and developers building with Dataflow."
  cards:
    - title: "Community"
      description: "Connect with fellow developers, share knowledge, and get help from our active community."
      links:
        - text: "Join Discourse community"
          href: "https://discourse.dataflow.com"
          target: "_blank"
    - title: "Learn"
      description: "Access comprehensive documentation, tutorials, and guides to get the most out of Dataflow."
      links:
        - text: "Read the documentation"
          href: "https://docs.dataflow.com"
          target: "_blank"
        - text: "Browse tutorials & blogs"
          href: "/blogs"
    - title: "Try"
      description: "Experience Dataflow firsthand with our interactive demos and free trial."
      actions:
        - text: "Watch interactive demo"
          onclick: "document.getElementById('arcadeModal').classList.remove('hidden')"
        - text: "Start free trial"
          href: "/start-free-trail"
    - title: "Support"
      description: "Get help when you need it from our dedicated support team."
      links:
        - text: "Contact support team"
          href: "/contact-us"
        - text: "Email us directly"
          href: "mailto:support@dataflow.com"

cta:
  title: Build your Data Application Today
  description: Turn data into a strategic competitive advantage using a powerful, secure and easy-to-use platform. Run AI/ML workloads on GPU-powered instances with one-click environments.
  cta_button_1: "Try it free"
  cta_button_2: "Talk to us"

LearnMoreBtn: Learn More
ViewMoreButton: View More
---
