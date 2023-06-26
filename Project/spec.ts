import { LiveObject, Spec, Property, Event, OnEvent, BigInt, Json } from '@spec.dev/core'

/**
 * A Project on the Allo protocol.
 */
@Spec({ 
    uniqueBy: ['projectId', 'chainId']
})
class Project extends LiveObject {
    // The project id.
    @Property()
    projectId: BigInt

    // Pointer to the project's off-chain metadata.
    @Property()
    metaPtr: Json

    // ==== Event Handlers ===================

    @OnEvent('allo.ProjectRegistry.ProjectCreated')
    createProject(event: Event) {
        this.projectId = BigInt.from(event.data.projectID)
    }

    @OnEvent('allo.ProjectRegistry.MetadataUpdated')
    updateMetadata(event: Event) {
        this.projectId = BigInt.from(event.data.projectID)
        this.metaPtr = event.data.metaPtr || []
    }
}

export default Project