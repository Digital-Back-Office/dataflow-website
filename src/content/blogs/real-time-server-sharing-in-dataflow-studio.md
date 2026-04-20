---
title: 'Real-time Server Sharing in Dataflow Studio'
description: "Collaborate on data pipelines, ML models & Airflow DAGs on a shared cloud server - RBAC access control, no duplicate environments. Try free today."
tags: ['Collaboration', 'Server Sharing', 'Real-time', 'Data Engineering']
date: '10 April, 2026'
image: /assets/images/blog/real-time-server-sharing-in-dataflow-studio.webp
category: ["product"]
author_id: 'hari-govind'
---

Dataflow Studio servers are something a lot of our users rely on for building data pipelines and training models. As a [cloud data workspace](https://dataflow.zone/product/shared-foundation/) built for modern data engineering platform needs, one thing that kept coming up, especially from teams, was the lack of a simple way to collaborate on the same server.

Until now, servers were mostly used by a single user. While teams could share files through a shared directory, collaborating on the actual server experience was still difficult. If someone wanted to share their work, they often had to recreate the setup or walk others through it step by step. That usually meant coordinating over calls, pointing teammates to the right files, and trying to keep everyone in sync manually.

In practice, this slowed teams down. It was harder to stay aligned when people were not working in the same place. Debugging took longer because issues had to be explained or reproduced instead of seen directly. Onboarding new teammates also required extra time and coordination. It also made real collaboration difficult. Instead of working together in the same space, teams were passing work back and forth or screen sharing just to stay in sync. That gets messy pretty quickly.
So we added server sharing, making Dataflow the data team collaboration tool your team actually needs. No more duplicate environments. Real-time collaboration. Faster debugging and iteration. Better team visibility.

You can now give other members of your organization access to your server in a couple of clicks. Go to the Studio home page, click the "Share" button on a server, add the user, and you're done.

Watch a quick demo of this flow
<iframe width="560" height="315" src="https://www.youtube.com/embed/32R2c8RgIN0?si=TNyM3svEv70MI-Xp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Once shared, the experience is live. You can see what others are doing, their cursor, selections, edits, as it happens. It feels closer to working in a shared editor than passing around containerized Python environments.

You can also control what they're allowed to do. For example, whether they can just access the environment or also start or stop the server, giving you full RBAC data platform access control without any extra setup.

Under the hood this is still a single running environment, so collaborators are effectively working inside the same runtime rather than syncing separate ones. That keeps things simple, but also means changes are immediately visible to everyone. Whether you're working on MLflow experiment tracking, an Airflow DAG setup, or a dbt integration with your data pipeline, your whole team stays in sync without the usual back-and-forth.

This should make it easier to work as a team without duplicating environments or stepping on each other's setups, whether you're a data platform for startups or a scaling MLOps platform for small teams looking for a Deepnote alternative or a Google Colab alternative with proper team features.

Why keep sharing files and restarting setups again and again?

Start collaborating in real time. Try server sharing today.
<a href="https://app.dataflow.zone/hub/login" title="Try Dataflow Today">Try Now</a>

