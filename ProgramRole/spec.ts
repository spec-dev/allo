import { LiveObject, Spec, Property, Address, OnEvent, Event } from '@spec.dev/core'

/**
 * TODO
 */
@Spec({ 
    uniqueBy: ['program', 'role', 'chainId']
})
class ProgramRole extends LiveObject {

    @Property()
    program: Address

	@Property()
    role: string

    @OnEvent('allo.Program.RoleGranted')
    onRoleGranted(event: Event) {
        this.role = event.data.role
        this.program = event.origin.contractAddress
    }
}

export default ProgramRole