# Live Objects for the Allo Protocol


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

### ProjectOwner

One of the owners of an Allo Project. [[spec](ProjectOwner/spec.ts)]

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