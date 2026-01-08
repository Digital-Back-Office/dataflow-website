---
top_section:
  title: "Define Once, Use Everywhere"
  description: "Define connections and secrets in one secure vault. Access them instantly across Airflow, Jupyter, and VS Code without copying .env files or exposing keys in git."
  button:
    label: "Get Started"
    href: "/book-demo"
  hero_image: "/assets/images/app-screenshots/dashboard.png"

comparison:
  heading: "The End of .env File Sprawl"
  leftHeading: "The Old Way"
  rightHeading: "The Dataflow Way"
  rows:
    - leftTitle: "Security Risk:"
      leftText: "Paste API keys into local .env files or GitHub secrets."
      rightTitle: "Central Vault:"
      rightText: "Keys are encrypted (AES-256) and stored centrally. Never touches disk."
    - leftTitle: "Maintenance Hell:"
      leftText: "Update a password in 5 different apps/scripts."
      rightTitle: "Update Once:"
      rightText: "Change the secret in Dataflow; it auto-syncs to all Airflow DAGs and Apps."
    - leftTitle: "Collaboration Friction:"
      leftText: "Securely share credentials via Slack/Email (unsafe)."
      rightTitle: "RBAC Sharing:"
      rightText: "Grant team access to the connection object without revealing the raw password."

why_data_connection_matters:
  title: "Why Data Connection Management Matters"
  description: "Effective data connection management is crucial for maintaining the accuracy and consistency of your data across multiple apps and platforms. By ensuring seamless synchronization and secure data transfers, you can enhance operational efficiency, reduce errors, and make informed decisions based on reliable data. Properly managed data connections streamline workflows, save time, and improve overall productivity, making them essential for any modern business."
  features:
    - title: "Interoperability"
      description: "Keep your data updated in real-time to reflect the most current information."
      image: /assets/icons/icon-clock-with-check.svg
    - title: "Improve Data Accuracy"
      description: "Ensure your data is consistent and reliable across all apps and platforms."
      image: /assets/icons/icon-settings-rise.svg
    - title: "Streamlined Workflows"
      description: "Simplify your processes by integrating and automating data connections."
      image: /assets/icons/icon-streamline.svg

grow_together_managing_connections:
  title: Grow Together by Managing Your Data Connections Across apps
  description: Managing your data connections across apps allows your business to grow seamlessly and efficiently. By integrating and synchronizing your data, you ensure consistency and accuracy, empowering your team to collaborate better and make data-driven decisions.
  button:
    label: "Get Started"
    href: "/book-demo"

core_features:
  title: Core Features of  Data Connection Management
  description: Our Data Connection Management offers automatic synchronization, secure data transfers, and customizable integrations for seamless data handling. With comprehensive monitoring and scalability, you can manage and optimize your data connections effortlessly.
  button:
    label: "Get Started"
    href: "/book-demo"
  features:
    - title: Zero-Trust Security
      description: Secrets are encrypted at rest and in transit. We use industry-standard banking-grade encryption to ensure your credentials never leak.
      image: /assets/icons/realtimeprocessing.png
    - title: Audit Logs
      description: Know exactly who accessed which secret and when. Full audit trails for compliance (SOC2/ISO 27001).
      image: /assets/icons/autoscaling.png
    - title: Scoped Permissions
      description: Limit access by environment. Ensure Production_DB credentials can only be accessed by the Prod Airflow cluster, not by a developer's local notebook.
      image: /assets/icons/batchprocessing.png
    - title: Unified experience
      description: Connections created in Dataflow are automatically available to all the apps. Use dataflow.connection to access it easily
      image: /assets/icons/streamandbatchanalytics.png
---
