import { LiveObject, Spec, Property, Event, OnEvent, OnAllEvents, Address, BigInt } from '@spec.dev/core'

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

    // Whether they are still an active owner.
    @Property()
    isActive: boolean

    // ==== Event Handlers ===================

    @OnAllEvents()
    setCommonProperties(event: Event) {
        this.projectId = BigInt.from(event.data.projectID)
        this.accountAddress = event.data.owner
    }

    @OnEvent('allo.ProjectRegistry.ProjectCreated')
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