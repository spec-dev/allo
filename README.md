# Allo Live Objects

Live Objects on Spec for the [Allo Protocol](https://docs.allo.gitcoin.co).

### Account

An account on the Allo protocol. [[spec](Account/spec.ts)]

```typescript
interface Account {
    address: Address
    blockHash: BlockHash
    blockNumber: BlockNumber
    blockTimestamp: Timestamp
    chainId: ChainId
}
```
* **Unique By**: `(address, chainId)`
* **Chains**: 1,5
* **Affected By**:
    * `allo.ProjectRegistry.ProjectCreated`

### Project

A Project that can apply for a Round on the Allo protocol. [[spec](Project/spec.ts)]

```typescript
interface Project {
    projectId: BigInt
    metaProtocol: number
    metaPointer: string
    blockHash: BlockHash
    blockNumber: BlockNumber
    blockTimestamp: Timestamp
    chainId: ChainId
}
```
* **Unique By**: `(projectId, chainId)`
* **Chains**: 1,5
* **Affected By**:
    * `allo.ProjectRegistry.ProjectCreated`
    * `allo.ProjectRegistry.MetadataUpdated`
    
### ProjectOwner

An owner of an Allo Project. [[spec](ProjectOwner/spec.ts)]

```typescript
interface ProjectOwner {
    projectId: BigInt
    accountAddress: Address
    isActive: boolean
    blockHash: BlockHash
    blockNumber: BlockNumber
    blockTimestamp: Timestamp
    chainId: ChainId
}
```
* **Unique By**: `(projectId, accountAddress, chainId)`
* **Chains**: 1,5
* **Affected By**:
    * `allo.ProjectRegistry.ProjectCreated`
    * `allo.ProjectRegistry.OwnerAdded`
    * `allo.ProjectRegistry.OwnerRemoved`

# Allo Contracts

The following Allo contracts have been registered on Spec:

### Ethereum

| Contract Name  | Instances |
| ------------- | ------------- |
| `eth.contracts.ProgramFactory`  | `0xe0281a20dfacb0e179e6581c33542bc533ddc4ab`
| `eth.contracts.ProgramImplementation`  | `0x21b0be8253deda0d2d8f010d06ed86093d52359b`
| `eth.contracts.QuadraticFundingVotingStrategyFactory`  | `0x5030e1a81330d5098473e8d309e116c2792202eb`
| `eth.contracts.RoundFactory`  | `0xe2bf906f7d10f059ce65769f53fe50d8e0cc7cbe`
| `eth.contracts.RoundImplementation`  | `0x3e7f72dfedf6ba1bcbfe77a94a752c529bb4429e`
| `eth.contracts.ProjectRegistry`  | `0x03506ed3f57892c85db20c36846e9c808afe9ef4`

### Goerli

| Contract Name  | Instances |
| ------------- | ------------- |
| `goerli.contracts.ProgramFactory`  | `0x548c775c4bd61d873a445ee4e769cf1a18d60ea9`
| `goerli.contracts.ProgramImplementation`  | `0x8568133ff3ef0bd108868278cb2a516eaa3b8abf`
| `goerli.contracts.QuadraticFundingVotingStrategyFactory`  | `0xf741f7b6a4cb3b4869b2e2c01ab70a12575b53ab`
| `goerli.contracts.RoundFactory`  | `0x5770b7a57bd252fc4bb28c9a70c9572ae6400e48`
| `goerli.contracts.RoundImplementation`  | `0x0ff5962bc56ba0cf6d7d6ef90df274ae5dc4d16a`
| `goerli.contracts.ProjectRegistry`  | `0x832c5391dc7931312cbdbc1046669c9c3a4a28d5`

# Developing & Testing Locally

To test the live objects locally, first make sure the following requirements are met/installed.

### Requirements

* Node.js >= 16
* Deno >= 1.3 (+recommend the Deno/Denoland VSCode extension)
* Postgres >= 14
* Spec CLI

**Helpful Links**

* [Install Deno](https://deno.com/manual@v1.33.1/getting_started/installation)
* [Install Postgres with Brew](https://www.moncefbelyamani.com/how-to-install-postgresql-on-a-mac-with-homebrew-and-lunchy/)

### Setup

1) Install the Spec CLI:

```bash
$ npm install -g @spec.dev/cli
```

2) Login to your account:

```bash
$ spec login
```

3) Make sure one of your Spec projects has been set as the *current* one (Spec just needs to use one of your project's api keys when subscribing to input events during testing).

```bash
$ spec use project <org>/<name>
```

4) Make sure your local postgres instance is running on localhost:5432

### Testing Live Objects

To test a single Live Object:

```bash
$ spec test object Project
```

To test multiple at the same time:

```bash
$ spec test objects Project,Account
```

To test all Live Objects in this folder simultaneously:

```bash
$ spec test objects .
```