import { LiveObject, Spec, Property, Event, OnEvent, Address, Timestamp } from '@spec.dev/core'

/**
 * Round Application for a Project on the Allo protocol.
 */
@Spec({ 
    uniqueBy: ['round', 'applicationIndex', 'chainId'] 
})
class RoundApplication extends LiveObject {
    @Property()
    round: Address

    @Property()
    applicationIndex: number

    @Property()
    address: Address

    @Property()
    project: string

    @Property()
    status: number

    @Property()
    metaProtocol: number

    @Property()
    metaPointer: string

    @Property()
    sender: Address

    @Property()
    createdAt: Timestamp

    @Property()
    updatedAt: Timestamp

    // ==== Event Handlers ===================

    @OnEvent('allo.Round.NewProjectApplication')
    async onNewProjectApplication(event: Event) {
        this.address = event.data.contractAddress
        
        this.round = event.data.round
        this.applicationIndex = event.data.applicationIndex
        this.chainId = event.data.chainId

        const [protocol, pointer] = event.data.applicationMetaPtr || []

        const tx = await this.getCurrentTransaction()
        this.sender = tx?.from

        this.metaProtocol = Number(protocol)
        this.metaPointer = pointer
        this.status = 0

        this.project = event.data.project
        this.createdAt = event.origin.blockTimestamp
        this.updatedAt = event.origin.blockTimestamp

        this.addContractToGroup(this.address, 'allo.RoundApplication')
    }

    @OnEvent('allo.Round.ApplicationStatusesUpdated')
    onApplicationStatusesUpdated(event: Event) {
        this.status = event.data.status
    }
}

export default RoundApplication