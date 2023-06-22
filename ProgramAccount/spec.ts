import { LiveObject, Spec, Property, Address, OnEvent, Event } from '@spec.dev/core'

/**
 * TODO
 */
@Spec({ 
    uniqueBy: ['program', 'account', 'role', 'chainId']
})
class ProgramAccount extends LiveObject {
    @Property()
    program: Address

	@Property()
    account: Address

	@Property()
    role: string

    @Property({ default: false })
	wasRevoked: boolean

    @OnEvent('allo.Program.RoleGranted')
    onRoleGranted(event: Event) {
        this.program = event.origin.contractAddress
        this.account = event.data.account
        this.role = event.data.role
    }

    @OnEvent('allo.Program.RoleRevoked')
    onRoleRevoked(event: Event) {
        this.program = event.origin.contractAddress
        this.account = event.data.account
        this.role = event.data.role
        this.wasRevoked = true
    }
}

export default ProgramAccount