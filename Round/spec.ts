import { LiveObject, Spec, Property, BigInt, Event, OnEvent, Address, Json, Timestamp } from '@spec.dev/core'

/**
 * A Round on the Allo protocol.
*/
@Spec({ 
    uniqueBy: ['address', 'chainId'] 
})
class Round extends LiveObject {
    // Address of the round.
    @Property()
    address: Address

    // Address of the program connected to the round.
    @Property()
    programAddress: Address

    // Address of the voting strategy contract.
    @Property()
    votingStrategyAddress: Address

    // Address of the payout contract.
    @Property()
    payoutContractAddress: Address

    // When the round starts accepting applications.
    @Property()
    applicationsStartTime: Timestamp

    // When the round stops accepting applications.
    @Property()
    applicationsEndTime: Timestamp

    // When the round starts.
    @Property()
    roundStartTime: Timestamp

    // When the round ends.
    @Property()
    roundEndTime: Timestamp

    // Token used to payout match amounts at the end of a round.
    @Property()
    tokenAddress: Address

    // The round's match amount.
    @Property()
    matchAmount: BigInt

    // Fee percentage of the round.
    @Property()
    roundFeePercentage: BigInt

    // Address of the round fee contract.
    @Property()
    roundFeeAddress: Address

    // Pointer to the round's off-chain metadata.
    @Property()
    roundMetaPtr: Json

    // Pointer to the application's off-chain metadata.
    @Property()
    applicationMetaPtr: Json

    // Pointer to the project's off-chain metadata.
    @Property()
    projectsMetaPtr: Json

    // When the round was created.
    @Property({ canUpdate: false })
    createdAt: Timestamp

    // Round version.
    @Property()
    version: string

    // ==== Event Handlers ===================

    @OnEvent('allo.RoundFactory.RoundCreated')
    createRound(event: Event) {
        this.address = event.data.roundAddress
        this.programAddress = event.data.ownedBy
        this.createdAt = this.blockTimestamp
        // TODO: Bind to round contract and get/set the remaining properties.
        this.addContractToGroup(this.address, 'allo.Round')
    }

    @OnEvent('allo.Round.RoleGranted')
    @OnEvent('allo.Round.RoleRevoked')
    trackUpdate(event: Event) {
        this.address = event.origin.contractAddress
    }

    @OnEvent('allo.Round.MatchAmountUpdated')
    updateMatchAmount(event: Event) {
        this.address = event.origin.contractAddress
        this.matchAmount = BigInt.from(event.data.newAmount)
    }

    @OnEvent('allo.Round.RoundFeePercentageUpdated')
    updateRoundFeePercentage(event: Event) {
        this.address = event.origin.contractAddress
        this.roundFeePercentage = BigInt.from(event.data.roundFeePercentage)
    }

    @OnEvent('allo.Round.RoundFeeAddressUpdated')
    updateRoundFeeAddress(event: Event) {
        this.address = event.origin.contractAddress
        this.roundFeeAddress = event.data.roundFeeAddress
    }

    @OnEvent('allo.Round.RoundMetaPtrUpdated')
    updateRoundMetaPtr(event: Event) {
        this.address = event.origin.contractAddress
        this.roundMetaPtr = event.data.newMetaPtr || []
    }

    @OnEvent('allo.Round.ApplicationMetaPtrUpdated')
    updateApplicationMetaPtr(event: Event) {
        this.address = event.origin.contractAddress
        this.applicationMetaPtr = event.data.newMetaPtr || []
    }

    @OnEvent('allo.Round.ApplicationsStartTimeUpdated')
    updateAppStartTime(event: Event) {
        this.address = event.origin.contractAddress
        this.applicationsStartTime = this._toTimestamp(event.data.newTime)
    }

    @OnEvent('allo.Round.ApplicationsEndTimeUpdated')
    updateAppEndTime(event: Event) {
        this.address = event.origin.contractAddress
        this.applicationsEndTime = this._toTimestamp(event.data.newTime)
    }

    @OnEvent('allo.Round.RoundStartTimeUpdated')
    updateRoundStartTime(event: Event) {
        this.address = event.origin.contractAddress
        this.roundStartTime = this._toTimestamp(event.data.newTime)
    }

    @OnEvent('allo.Round.RoundEndTimeUpdated')
    updateRoundEndTime(event: Event) {
        this.address = event.origin.contractAddress
        this.roundEndTime = this._toTimestamp(event.data.newTime)
    }

    // ==== Helpers ===================

    _toTimestamp(unix): string | null {
        const unixTs = parseInt(unix)
        if (Number.isNaN(unixTs)) return null
        return new Date(unixTs * 1000).toISOString()
    }
}

export default Round