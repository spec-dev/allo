# Contract Groups

Because the Spec ecosystem is inherently multi-chain, whenever a new protocol is onboarded, all of its contracts are registered into what we call, contract "groups". A **contract group** is a set of contract addresses that all share a common ABI, regardless of deployment chain.

![](https://dbjzhg7yxqn0y.cloudfront.net/cg.png)

This simple abstraction unlocks a writing style that is concise, intuitive, and powerful, especially when indexing the same contextual data across multiple chains.

Every contract group exists under a particular [Namespace](./Writing-Live-Objects.md#namespaces) — such as `allo`, `gitcoin`, etc. — and only members of that namespace have the write permissions needed to create them.

## Requirements

* [Spec CLI](./CLI-Setup.md)

## Adding contracts to a group

To add contracts to a group, whether existing or new, run the following CLI command and follow the prompts:

```bash
$ spec add contracts
```

* Chain id — The chain id associated with the new contract addresses
* Contract addresses — The deployment addresses of the contracts you wish to add
* Group name — The full name of the contract group
* Path to ABI — The ABI of the contracts you are adding

#### Example: `allo.ProjectRegistry`

https://github.com/spec-dev/allo/assets/6496306/260114f8-9dbe-48a0-86cb-c5d9d841d68a

## Factory contract groups

Many protocols implement a factory pattern with at least one of their contracts. To account for this, Spec has a way of dynamically adding new contracts to an existing group, on-the-fly. Currently, this is done within a Live Object event handler, using a class method called `addContractToGroup`.

#### Factory Example: `allo.Round`

```typescript
@OnEvent('allo.RoundFactory.RoundCreated')
createPool(event: Event) {
    this.address = event.data.roundAddress
    this.programAddress = event.data.ownedBy
    this.createdAt = this.blockTimestamp
    this.addContractToGroup(this.address, 'allo.Round')  // add new round address to existing contract group
}
```

## Viewing the contract addresses in a group

To view the contracts that exist within a particular group, use the following CLI command:

```bash
$ spec get group <namespace.ContractGroup>
```

This will show you all contract addresses currently in the group, organized by chain.

#### Example: `allo.ProjectRegistry`

https://github.com/spec-dev/allo/assets/6496306/45fba462-0f20-4e43-84fa-bbdb485ea03e

## Viewing the events in a group

To view the events that exist within a particular group, use the following CLI command:

```bash
$ spec get events <namespace.ContractGroup>
```

#### Example: `allo.ProjectRegistry`

https://github.com/spec-dev/allo/assets/6496306/7645af22-3045-4056-acf5-f6ac59244354

