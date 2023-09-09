import { Spec, LiveTable, Property, Address, OnEvent, Event } from '@spec.dev/core'

/**
 * A role assigned to a Round on the Allo protocol.
 */
@Spec({ 
    uniqueBy: ['roundAddress', 'role', 'chainId']
})
class RoundRole extends LiveTable {
    // Round address.
    @Property()
    roundAddress: Address

    // Role identifier.
    @Property()
    role: string

    // ==== Event Handlers ===================

    @OnEvent('allo.Round.RoleGranted')
    @OnEvent('allo.Round.RoleRevoked')
    createRole(event: Event) {
        this.roundAddress = event.origin.contractAddress
        this.role = event.data.role
    }
}

export default RoundRole