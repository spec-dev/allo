import { Spec, LiveTable, Property, Event, OnEvent, BigInt, Json, Timestamp, resolveMetadata } from '@spec.dev/core'

/**
 * A Project on the Allo protocol.
 */
@Spec({ 
    uniqueBy: ['projectId', 'chainId']
})
class Project extends LiveTable {
    // The project id.
    @Property()
    projectId: BigInt

    // The project title.
    @Property()
    title: string

    // The project description.
    @Property({ columnType: 'text' })
    description: string

    // The project website.
    @Property()
    website: string

    // Twitter handle for the project.
    @Property()
    twitter: string

    // Pointer to the project's off-chain metadata.
    @Property()
    metaPtr: Json

    // The project's off-chain metadata.
    @Property()
    metadata: Json

    // When the project was first created.
    @Property()
    createdAt: Timestamp

    // ==== Event Handlers ===================

    @OnEvent('allo.ProjectRegistry.ProjectCreated')
    createProject(event: Event) {
        this.projectId = BigInt.from(event.data.projectID)
        this.createdAt = this.blockTimestamp
    }

    @OnEvent('allo.ProjectRegistry.MetadataUpdated')
    async updateMetadata(event: Event) {
        this.projectId = BigInt.from(event.data.projectID)

        // Resolve metadata.
        this.metaPtr = event.data.metaPtr || []
        const [protocolId, pointer] = event.data.metaPtr || []
        this.metadata = await resolveMetadata(pointer, { protocolId })

        // Bring primary meta properties to top-level.
        this.title = this.metadata.title
        this.description = this.metadata.description
        this.website = this.metadata.website
        this.twitter = this.metadata.projectTwitter
    }
}

export default Project