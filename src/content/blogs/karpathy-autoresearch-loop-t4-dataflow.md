---
title: "Running Karpathy's Autoresearch Loop on a T4 GPU inside Dataflow"
description: "Karpathy's autoresearch model was designed around H100-class hardware. Here's how I patched the hardware, dataset, storage, precision, and edit-safety layers to make the same loop run — practically — on a Tesla T4 inside a Dataflow notebook."
tags: [ML Research, Jupyter Notebook Cloud Platform, Managed GPU Instances, Reproducible ML]
date: '17 April, 2026'
image: /assets/images/blog/karpathy-autoresearch-loop-t4-dataflow.webp
category: ["product"]
author_id: 'yaswanth-ampolu'
---

**CONTEXT — WHAT IS DATAFLOW?**

> **Dataflow** (dataflow.zone) is a **Jupyter notebook cloud platform** built for data teams and ML engineers who want a reproducible machine learning environment without managing infrastructure. It provides managed GPU instances for ML workloads, persistent shared disks, and containerized Python environments — a practical alternative to Colab, Paperspace, or Databricks for small teams. This post shows a real workflow running entirely inside Dataflow.

**EXECUTION STACK AT A GLANCE**

| Layer | Karpathy Original | Dataflow T4 |
| :---- | :---- | :---- |
| Hardware | H100-class GPU | Tesla T4 (Dataflow) |
| Dataset | climbmix-400b-shuffle | TinyStories benchmark |
| Seq length | MAX\_SEQ\_LEN \= 2048 | MAX\_SEQ\_LEN \= 256 |
| Precision | bf16 | fp16 (T4 compatible) |
| Attention | H100-oriented kernels | SDPA (patched) |
| Storage | Notebook home dir | /home/jovyan/shared/ |
| Edit loop | Agent edits train.py freely | provider\_loop.py (validated) |
| Experiment | 5 minutes | 5 minutes (unchanged) |

I adapted Andrej Karpathy's autoresearch execution model so it can run practically inside Dataflow on a T4 GPU instead of assuming an H100-class machine.  Karpathy's original execution is intentionally minimal. The human writes program.md, the agent reads it, edits only train.py, runs a fixed 5-minute training experiment, evaluates with prepare.py, checks val\_bpb, commits the change if it improves, and rolls it back if it does not. In the original repo, prepare.py is the fixed benchmark layer: it uses karpathy/climbmix-400b-shuffle, MAX\_SEQ\_LEN \= 2048, VOCAB\_SIZE \= 8192, TIME\_BUDGET \= 300, and a large validation budget. The training side is designed around a stronger GPU setup and expects the agent to freely modify train.py.

In my Dataflow version, I kept the same core idea but patched the execution stack for a T4. I changed the data path from the large climbmix setup to a TinyStories-based benchmark, reduced the sequence length to MAX\_SEQ\_LEN \= 256, kept the same 5-minute experiment budget, and moved the dataset, tokenizer, cache, and virtual environment into /home/jovyan/shared/autoresearch-t4-support so the workflow uses the larger persistent shared disk instead of filling the notebook home directory.

I also patched the training path for T4 compatibility. The original theory works well on H100-style hardware, but the T4 path needed fp16 instead of relying on bf16, SDPA attention instead of H100-oriented attention/kernel assumptions, and removal of unsupported kernel dependencies. That made train.py actually runnable on the Tesla T4 available in Dataflow.  
The other major change was how the AI edit loop is controlled. Karpathy's original setup assumes a coding agent directly edits train.py with full freedom. In Dataflow, I made that safer through t4-colab-loop.ipynb and provider\_loop.py: the notebook lets me choose Gemini or another provider, securely enter the API key, ask the model for experiment ideas, apply only validated edits to train.py, run the 5-minute training job, parse val\_bpb, and keep or discard the run using local git.

So the difference is: Karpathy's repo proves the clean H100 agent loop; my version keeps that loop but patches the hardware layer, dataset layer, storage layer, precision/attention layer, and edit-safety layer so the same autoresearch idea can run in a Dataflow T4 notebook environment.

**KEY TAKEAWAYS**

- The autoresearch loop is hardware-agnostic when you patch the right layers — no H100 needed.

- Dataflow's persistent shared disk (/home/jovyan/shared/) keeps dataset, tokenizer, and venv off the limited notebook home directory.

- fp16 \+ SDPA is a viable T4 substitute for bf16 \+ H100-tuned kernels, with no changes to the core experiment logic.

- The validated edit loop via provider\_loop.py makes AI-driven train.py mutation safe for multi-run research workflows.

- This is a working example of a reproducible machine learning environment on a managed GPU notebook — the kind of setup Dataflow is built for.

**Want to run this yourself?**

Dataflow gives you managed GPU instances, persistent shared storage, and a cloud Jupyter environment — everything this workflow needs. Visit [dataflow.zone](https://dataflow.zone/) to get started, and see the code in [Yaswanth-ampolu/auto-research-t4](https://github.com/Yaswanth-ampolu/auto-research-t4).

