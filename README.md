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

# Developing & Testing Locally

To test the live objects locally, first make sure the following requirements are met/installed.

### Requirements

* Node.js >= 16
* Deno >= 1.3 (+recommend the Deno/Denoland VSCode extension)
* Postgres >= 14
* Spec CLI

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

Testing all live objects in this folder should be as easy as running:

```bash
$ spec test objects .
```
