import { LiveObject, Spec, Property, Address, OnEvent, Event } from '@spec.dev/core'

/**
 * An account on the Allo protocol.
 */
@Spec({ 
    uniqueBy: ['address', 'chainId'] 
})
class Account extends LiveObject {
    // Address of the account.
    @Property()
    address: Address

    // ==== Event Handlers ===================

    @OnEvent('allo.ProjectRegistry.ProjectCreated')
    @OnEvent('allo.ProjectRegistry.OwnerAdded')
    onNewOwner(event: Event) {
        this.address = event.data.owner
    }

    @OnEvent('allo.Program.RoleGranted')
    @OnEvent('allo.Round.RoleGranted')
    onRoleGranted(event: Event) {
        this.address = event.data.account
    }

    @OnEvent('allo.Round.NewProjectApplication')
    async onNewApplication() {
        const tx = await this.getCurrentTransaction()
        this.address = tx?.from
    }
}

export default Account