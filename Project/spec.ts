import { LiveObject, Spec, Property, Event, OnEvent, OnAllEvents, BigInt } from '@spec.dev/core'

/**
 * A Project that can apply for a Round on the Allo protocol.
 */
@Spec({ 
    uniqueBy: ['projectId', 'chainId']
})
class Project extends LiveObject {
    // The project id.
    @Property()
    projectId: BigInt

    // Protocol where metadata is stored off-chain.
    @Property()
    metaProtocol: number

    // Unique pointer to off-chain metadata.
    @Property()
    metaPointer: string

    // ==== Event Handlers ===================

    @OnAllEvents()
    setCommonProperties(event: Event) {
        this.projectId = BigInt.from(event.data.projectID)
    }

    @OnEvent('allo.ProjectRegistry.ProjectCreated')
    createProject() { /* Nothing left to do :) */ }

    @OnEvent('allo.ProjectRegistry.MetadataUpdated')
    updateMetadata(event: Event) {
        const [protocol, pointer] = event.data.metaPtr || []
        this.metaProtocol = Number(protocol)
        this.metaPointer = pointer
    }
}

export default Project