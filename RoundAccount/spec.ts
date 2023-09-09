import { Spec, LiveTable, Property, Address, OnEvent, Event, BeforeAll } from '@spec.dev/core'

/**
 * An operator of an Allo Round with a specific role.
 */
@Spec({ 
    uniqueBy: ['roundAddress', 'accountAddress', 'role', 'chainId']
})
class RoundAccount extends LiveTable {
    // Round address.
    @Property()
    roundAddress: Address

    // Operator address.
    @Property()
    accountAddress: Address

    // Role identifier.
    @Property()
    role: string

    // Whether the role was revoked.
    @Property({ default: false })
    wasRevoked: boolean

    // ==== Event Handlers ===================

    @BeforeAll()
    setCommonProperties(event: Event) {
        this.roundAddress = event.origin.contractAddress
        this.accountAddress = event.data.account
        this.role = event.data.role
    }

    @OnEvent('allo.Round.RoleGranted')
    grantRole() {
        this.wasRevoked = false
    }

    @OnEvent('allo.Round.RoleRevoked')
    revokeRole() {
        this.wasRevoked = true
    }
}

export default RoundAccount