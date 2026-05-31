---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Kubernetes, the short version'
pubDate: '2026-05-29'
tags: ['kubernetes', 'infrastructure', 'devops']
---

When your app runs on a single server, everything is straightforward. But once traffic grows and you need multiple servers running multiple containers, a new problem appears: who manages all of that?

That's what Kubernetes is for.

### From one server to many

The natural path looks like this: one server works until it doesn't, then you make it bigger (vertical scaling), and eventually you add more servers behind a load balancer. The load balancer distributes requests and stops sending traffic to servers that go down.

But now you have many containers running across many machines. If one crashes at 3am, someone has to restart it. If a node goes down, its containers need to move. Doing this manually doesn't scale — so you automate it. That automation is called **orchestration**.

### What Kubernetes does

Kubernetes runs and manages containers across a cluster to match a **desired state**.

You declare what you want — "three replicas of this container, always" — and Kubernetes makes sure reality matches. If something drifts (a container crashes, a node goes down), it corrects it automatically.

### How the cluster is structured

A cluster has two parts:

- **Control plane** — the brain. Holds cluster state, schedules work, responds to events.
- **Worker nodes** — where your app actually runs.

Each worker node runs **Pods** — the smallest deployable unit. A Pod wraps one or more containers.

```
Cluster
├── Control Plane  ← manages everything
└── Worker Nodes   ← runs your app
    └── Pods
        └── Containers
```

### Self-healing

When a Pod managed by a **Deployment** crashes, Kubernetes notices the difference between desired state and actual state and creates a replacement. No manual restart needed.

### Services

Pods are temporary. They crash, get replaced, and come back with a new IP. You can't reliably route traffic to them directly.

A **Service** gives you a stable endpoint in front of a set of Pods. Clients always hit the same address — the Service handles routing to whichever Pods are healthy underneath.

```
Client → Service (stable IP) → Pod 1
                             → Pod 2
                             → Pod 3
```

### Quick reference

| Concept          | What it is                                              |
| ---------------- | ------------------------------------------------------- |
| Vertical scaling | Making one server bigger                                |
| Load balancer    | Distributes traffic across servers                      |
| Container image  | Blueprint for a container                               |
| Orchestration    | Automating container management at scale                |
| Kubernetes       | Runs containers across a cluster, matches desired state |
| Worker node      | Where your app actually runs                            |
| Pod              | Smallest unit — wraps your containers                   |
| Deployment       | Declares how many Pods should run, handles restarts     |
| Service          | Stable endpoint in front of ephemeral Pods              |
