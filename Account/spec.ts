import { LiveObject, Spec, Property, Address, OnEvent, Event } from '@spec.dev/core'

/**
 * An account on the Allo protocol.
 */
@Spec({ 
    uniqueBy: ['address', 'chainId'] 
})
class Account extends LiveObject { 
    // The address of the Account.
    @Property()
    address: Address

    // ==== Event Handlers ===================

    @OnEvent('allo.ProjectRegistry.ProjectCreated')
    registerAccount(event: Event) {
        this.address = event.data.owner
    }
}

export default Account