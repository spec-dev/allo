import { Spec, LiveTable, Property, Address, OnEvent, Event } from '@spec.dev/core'

/**
 * An account on the Allo protocol.
 */
@Spec({ 
    uniqueBy: ['address', 'chainId'] 
})
class Account extends LiveTable {
    // Address of the account.
    @Property()
    address: Address

    // ==== Event Handlers ===================

    @OnEvent('allo.ProjectRegistry.ProjectCreated')
    @OnEvent('allo.ProjectRegistry.OwnerAdded')
    createFromOwner(event: Event) {
        this.address = event.data.owner
    }

    @OnEvent('allo.Program.RoleGranted')
    @OnEvent('allo.Round.RoleGranted')
    createFromAccount(event: Event) {
        this.address = event.data.account
    }
}

export default Account