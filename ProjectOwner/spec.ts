import { LiveObject, Spec, Property, Event, OnEvent, Address, BigInt } from '@spec.dev/core'

/**
 * An owner of a Project on the Allo protocol
 */
@Spec({
    uniqueBy: ['projectId', 'accountAddress', 'chainId'] 
})
class ProjectOwner extends LiveObject {
    // The project id.
    @Property()
    projectId: BigInt

    // The address of the owner.
    @Property()
    accountAddress: Address

    // Whether they are still an active owner.
    @Property()
    isActive: boolean

    // ==== Event Handlers ===================

    @OnEvent('allo.ProjectRegistry.ProjectCreated')
    @OnEvent('allo.ProjectRegistry.OwnerAdded')
    addOwner(event: Event) {
        this.projectId = BigInt.from(event.data.projectID)
        this.accountAddress = event.data.owner
        this.isActive = true
    }

    @OnEvent('allo.ProjectRegistry.OwnerRemoved')
    removeOwner(event: Event) {
        this.projectId = BigInt.from(event.data.projectID)
        this.accountAddress = event.data.owner
        this.isActive = false
    }
}

export default ProjectOwner