# Contract Groups

All data on Spec is organized by context rather than by chain. Because of this, when a protocol is onboarded into the Spec ecosystem, all of its contracts are organized into <b>Contract Groups</b> that are chain-agnostic and contextually specific (e.g. `uniswapv3.Pool`, `gitcoin.Timelock`, `allo.ProjectRegistry`, etc.). 

Technically speaking, a Contract Group is a set of contract addresses that all share a common ABI, regardless of deployment chain. You can visualize a Contract Group like this:

![](https://dbjzhg7yxqn0y.cloudfront.net/cg.png)

Every Contract Group exists under a particular [Namespace](./Writing-Live-Objects.md#namespaces) — such as `allo`, `gitcoin`, etc. Everyone on Spec has read-access to all Contract Groups in the ecosystem, but only members of the group's namespace have write permissions.

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

