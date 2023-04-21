import { LiveObject, Spec, Property, Event, OnEvent, OnAllEvents, BlockNumber, BigInt, Timestamp, ChainId, saveAll } from '@spec.dev/core'
import ProjectOwner from '../ProjectOwner/spec.ts'
import Account from '../Account/spec.ts'

/**
 * A Project that can apply for a Round on the Allo protocol.
 */
@Spec({ uniqueBy: ['projectId', 'chainId'] })
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

    // The block number in which the Project was last updated.
    @Property()
    blockNumber: BlockNumber

    // The block timestamp in which the Project was last updated.
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
        this.projectId = BigInt.from(event.data.projectId)
        this.blockNumber = event.origin.blockNumber
        this.blockTimestamp = event.origin.blockTimestamp
        this.chainId = event.origin.chainId
    }

    @OnEvent('allo.ProjectRegistry.ProjectCreated')
    async createProject(event: Event) {
        // Register account address.
        const account = this.new(Account, {
            address: event.data.owner,
            blockNumber: this.blockNumber,
            blockTimestamp: this.blockTimestamp,
            chainId: this.chainId,
        })

        // Add owner to project.
        const projectOwner = this.new(ProjectOwner, {
            projectId: this.projectId,
            accountAddress: account.address,
            blockNumber: this.blockNumber,
            blockTimestamp: this.blockTimestamp,
            chainId: this.chainId,
        })

        // Save all in a single tx.
        await saveAll(this, account, projectOwner)
    }

    @OnEvent('allo.ProjectRegistry.MetadataUpdated')
    updateMetadata(event: Event) {
        const [protocol, pointer] = event.data.metaPtr || []
        this.metaProtocol = Number(protocol)
        this.metaPointer = pointer
    }
}

export default Project