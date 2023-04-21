import { LiveObject, Spec, Property, Address, BlockNumber, Timestamp, ChainId } from '@spec.dev/core'

/**
 * An account on Allo.
 */
@Spec({ uniqueBy: ['address', 'chainId'] })
class Account extends LiveObject {
    // The address of the Account.
    @Property()
    address: Address

    // The block number in which the Account was last updated.
    @Property()
    blockNumber: BlockNumber

    // The block timestamp in which the Account was last updated.
    @Property({ primaryTimestamp: true })
    blockTimestamp: Timestamp

    // The blockchain id.
    @Property()
    chainId: ChainId
}

export default Account