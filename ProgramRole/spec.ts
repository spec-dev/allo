import { LiveObject, Spec, Property, Address, OnEvent, Event } from '@spec.dev/core'

/**
 * A role assigned to a Program on the Allo protocol.
 */
@Spec({ 
    uniqueBy: ['programAddress', 'role', 'chainId']
})
class ProgramRole extends LiveObject {
    // Program address.
    @Property()
    programAddress: Address

    // Role identifier.
    @Property()
    role: string

    // ==== Event Handlers ===================

    @OnEvent('allo.Program.RoleGranted')
    @OnEvent('allo.Program.RoleRevoked')
    createRole(event: Event) {
        this.programAddress = event.origin.contractAddress
        this.role = event.data.role
    }
}

export default ProgramRole