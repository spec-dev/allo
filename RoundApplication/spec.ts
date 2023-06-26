import { LiveObject, Spec, Property, Event, OnEvent, Address, Timestamp, BigInt, Json } from '@spec.dev/core'

/**
 * Round Application for a Project on the Allo protocol.
 */
@Spec({ 
    uniqueBy: ['roundAddress', 'applicationIndex', 'chainId'] 
})
class RoundApplication extends LiveObject {
    // Address of the round.
    @Property()
    roundAddress: Address

    // Unique index of the application for the round.
    @Property()
    applicationIndex: number

    // The id of the project associated with the application.
    @Property()
    projectId: BigInt

    // Application status.
    @Property()
    status: number

    // Pointer to the application's off-chain metadata.
    @Property()
    metaPtr: Json

    // Address that submitted the transaction.
    @Property()
    sender: Address

    // When the application was created.
    @Property({ canUpdate: false })
    createdAt: Timestamp

    // ==== Event Handlers ===================

    @OnEvent('allo.Round.NewProjectApplication')
    async createRoundApplication(event: Event) {
        this.roundAddress = event.origin.contractAddress
        this.applicationIndex = event.data.applicationIndex
        this.projectId = BigInt.from(event.data.projectID)
        this.metaPtr = event.data.applicationMetaPtr || []
        this.sender = (await this.getCurrentTransaction())?.from
        this.status = 0
        this.createdAt = this.blockTimestamp
    }

    // TODO: Sync with @allo team.
    @OnEvent('allo.Round.ApplicationStatusesUpdated')
    onApplicationStatusesUpdated(event: Event) {
        this.status = event.data.status
    }
}

export default RoundApplication