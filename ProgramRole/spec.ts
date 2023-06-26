import { LiveObject, Spec, Property, Address, OnEvent, Event } from '@spec.dev/core'

/**
 * A role assigned to a Program on the Allo protocol.
 */
@Spec({ 
    uniqueBy: ['program', 'role', 'chainId']
})
class ProgramRole extends LiveObject {
    // Program address.
    @Property()
    program: Address

    // Role identifier.
    @Property()
    role: string

    // ==== Event Handlers ===================

    @OnEvent('allo.Program.RoleGranted')
    onRoleGranted(event: Event) {
        this.role = event.data.role
        this.program = event.origin.contractAddress
    }
}

export default ProgramRole