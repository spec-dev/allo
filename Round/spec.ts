import { LiveObject, Spec, Property, BigInt, Event, OnEvent, Address, Timestamp } from '@spec.dev/core'

/**
 * TODO
*/
@Spec({ 
    uniqueBy: ['program', 'chainId'] 
})
class Round extends LiveObject {
    @Property()
    round: Address

    @Property()
    program: Address

    @Property()
    votingStrategy: string

    @Property()
    payoutStrategy: Address

    @Property()
    applicationsStartTime: string

    @Property()
    applicationsEndTime: string

    @Property()
    roundStartTime: string

    @Property()
    roundEndTime: string

    @Property()
    token: string

    @Property()
    matchAmount: BigInt

    @Property()
    roundFeePercentage: BigInt

    @Property()
    roundFeeAddress: string

    @Property()
    roundMetaPtr: string

    @Property()
    applicationMetaPtr: string

    @Property()
    projectsMetaPtr: string

    @Property()
    createdAt: Timestamp

    @Property()
    updatedAt: Timestamp

    @Property()
    version: string

    // ==== Event Handlers ===================

    @OnEvent('allo.RoundFactory.RoundCreated')
    onRoundCreated(event: Event) {
        console.log(event)
        // this.someProperty = event.data.someProperty
        // this.addContractToGroup(event.data.round, 'allo.Round')
    }

    // @Property()
    // payoutStrategy: PayoutStrategy!

    // @Property()
    // applicationsStartTime: string!

    // @Property()
    // applicationsEndTime: string!

    // @Property()
    // roundStartTime: string!

    // @Property()
    // roundEndTime: string!

    // @Property()
    // token: string!

    // @Property()
    // matchAmount: BigInt!

    // @Property()
    // roundFeePercentage: BigInt!

    // @Property()
    // roundFeeAddress: string!

    // @Property()
    // roundMetaPtr: MetaPtr! # id = "roundMetaPtr-{roundAddress.toHex()}"

    // @Property()
    // applicationMetaPtr: MetaPtr! # id = "applicationMetaPtr-{roundAddress.toHex()}"

    // @Property()
    // projectsMetaPtr: MetaPtr # id = "projectsMetaPtr-{roundAddress.toHex()}"

    // @Property()
    // createdAt: BigInt!

    // @Property()
    // updatedAt: BigInt!

    // @Property()
    // version: string!



}

export default Round