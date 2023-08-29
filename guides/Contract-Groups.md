# Contract Groups

### Table of Contents

* [Introduction](#introduction)
* [Permissions](#permissions)
* [Requirements](#requirements)
* [Adding contracts to a group manually](#adding-contracts-to-a-group-manually)
* [Adding contracts to a group dynamically](#adding-contracts-to-a-group-dynamically-factory-groups)
* [Viewing the contracts in a group](#viewing-the-contracts-in-a-group)
* [Viewing the events in a group](#viewing-the-events-in-a-group)
* [Next steps](#next-steps)

## Introduction

All data on Spec is organized by context rather than by chain. Because of this, when a protocol is onboarded into the Spec ecosystem, all of its contracts are organized into <b>Contract Groups</b> that are chain-agnostic and contextually specific (e.g. `uniswapv3.Pool`, `gitcoin.Timelock`, `allo.ProjectRegistry`, etc.). 

Technically speaking, a Contract Group is a set of contract addresses that all share a common ABI, regardless of deployment chain. You can visualize a Contract Group like this:

![](https://dbjzhg7yxqn0y.cloudfront.net/cg.png)

Contract Groups unlock a style of indexing that is concise, intuitive, and powerful, especially when consuming events across multiple chains. Once a contract group is formed, you can easily tap into any event in the group *by name* (e.g. `allo.ProjectRegistry.ProjectCreated`).

## Permissions

Every contract group belongs to particular [Namespace](./Writing-Live-Objects.md#namespaces) — such as `allo`, `gitcoin`, etc. Everyone on Spec has read access to all contract groups, while write access is reserved for members of the namespace.

## Requirements

* [Spec CLI](./CLI-Setup.md)

## Adding contracts to a group manually

To add contracts to a group, whether existing or new, run the following CLI command and follow the prompts:

```bash
$ spec add contracts
```

* Chain id — The chain id associated with the new contract addresses
* Contract addresses — The deployment addresses of the contracts you wish to add
* Group name — The full name of the contract group (with namespace)
* Path to ABI — The ABI for the group

#### Example: `allo.ProjectRegistry`

https://github.com/spec-dev/allo/assets/6496306/260114f8-9dbe-48a0-86cb-c5d9d841d68a

## Adding contracts to a group dynamically (factory groups)

Many protocols implement a factory pattern with at least one of their contracts. To account for this, Spec has a way of dynamically adding new contracts to an existing group, on-the-fly. Currently, this is done within a Live Object event handler, using a class method called `addContractToGroup`.

#### Factory Example: `allo.Round`

```typescript
@OnEvent('allo.RoundFactory.RoundCreated')
createRound(event: Event) {
    this.address = event.data.roundAddress
    this.programAddress = event.data.ownedBy
    this.createdAt = this.blockTimestamp

    // Add this new round address to the "allo.Round" contract group 
    // so that Spec's indexers will start picking up its events.
    this.addContractToGroup(this.address, 'allo.Round')
}
```
> [!IMPORTANT]
> The only requirement when using `addContractToGroup` is that the contract group itself must already exist. To create a new *empty* contract group to hold these factory-produced contracts, you can use the command below and follow the prompts:

```bash
$ spec create group
```

## Viewing the contracts in a group

To view the contracts that exist within a particular group, use the following CLI command:

```bash
$ spec get group <namespace.ContractName>
```

This will show you all contract addresses currently in the group, organized by chain.

#### Example: `allo.ProjectRegistry`

https://github.com/spec-dev/allo/assets/6496306/45fba462-0f20-4e43-84fa-bbdb485ea03e

## Viewing the events in a group

To view the events that exist within a particular group, use the following CLI command:

```bash
$ spec get events <namespace.ContractName>
```

#### Example: `allo.ProjectRegistry`

https://github.com/spec-dev/allo/assets/6496306/7645af22-3045-4056-acf5-f6ac59244354


## Next Steps

Now that you've added your contracts to Spec, you can leverage these contract events to index custom, higher-level, data models (i.e. Live Objects). [Learn how to write Live Objects](./Writing-Live-Objects.md).