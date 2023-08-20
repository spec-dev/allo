# Spec CLI

The easiest way to interface with Spec is through our CLI.

## Requirements

* Node.js >= 16
* npm >= 8

## Install the CLI

```bash
$ npm install -g @spec.dev/cli
```

## Log in to your account

```bash
$ spec login
```

*Reach out personally or on [Twitter](https://twitter.com/SpecDotDev) to request early access to an account.*

## Set your current project

When your Spec account was created, you were also most likely given write permissions to a particular **namespace** — this is usually either the name of a protocol or simply your username. Within that namespace exists a default project, just called `spec`. 

Go ahead and set this as your *current* project locally:

```bash
$ spec use project allo/spec
```

Going forward, if you are ever unsure about who your current user is or what your current project is, the following commands will answer those questions, respectively:

```bash
$ spec show user
```

```bash
$ spec show project
```

Alright, now let's [write some Live Objects](./Writing-Live-Objects.md)!