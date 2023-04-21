import { LiveObject, Spec, Property, Event, OnEvent, OnAllEvents, Address, BigInt, BlockNumber, Timestamp, ChainId } from '@spec.dev/core'

/**
 * One of the owners of an Allo Project.
 */
@Spec({ uniqueBy: ['projectId', 'accountAddress', 'chainId'] })
class ProjectOwner extends LiveObject {
    // The project id.
    @Property()
    projectId: BigInt

    // The address of the owner.
    @Property()
    accountAddress: Address

    // Whether they are still an active owner (or were removed).
    @Property()
    isActive: boolean

    // The block number in which the ProjectOwner was added or removed.
    @Property()
    blockNumber: BlockNumber

    // The block timestamp in which the ProjectOwner was added or removed.
    @Property({ primaryTimestamp: true })
    blockTimestamp: Timestamp

    // The blockchain id.
    @Property()
    chainId: ChainId

    //-----------------------------------------------------
    //  EVENT HANDLERS
    //-----------------------------------------------------

    @OnAllEvents()
    setCommonProperties(event: Event) {
        this.projectId = BigInt.from(event.data.projectID)
        this.accountAddress = event.data.owner
        this.blockNumber = event.origin.blockNumber
        this.blockTimestamp = event.origin.blockTimestamp
        this.chainId = event.origin.chainId
    }

    @OnEvent('allo.ProjectRegistry.OwnerAdded')
    addOwner() {
        this.isActive = true
    }

    @OnEvent('allo.ProjectRegistry.OwnerRemoved')
    removeOwner() {
        this.isActive = false
    }
}

export default ProjectOwner