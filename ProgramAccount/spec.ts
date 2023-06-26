import { LiveObject, Spec, Property, Address, OnEvent, Event, OnAllEvents } from '@spec.dev/core'

/**
 * An operator of an Allo Program with a specific role.
 */
@Spec({ 
    uniqueBy: ['program', 'account', 'role', 'chainId']
})
class ProgramAccount extends LiveObject {
    // Program address.
    @Property()
    program: Address

    // Operator address.
    @Property()
    account: Address

    // Role identifier.
    @Property()
    role: string

    // Whether this role-based access was revoked.
    @Property({ default: false })
    wasRevoked: boolean

    // ==== Event Handlers ===================

    @OnAllEvents()
    setCommonProperties(event: Event) {
        this.program = event.origin.contractAddress
        this.account = event.data.account
        this.role = event.data.role
    }

    @OnEvent('allo.Program.RoleGranted')
    onRoleGranted() {
        this.wasRevoked = false
    }

    @OnEvent('allo.Program.RoleRevoked')
    onRoleRevoked() {
        this.wasRevoked = true
    }
}

export default ProgramAccount