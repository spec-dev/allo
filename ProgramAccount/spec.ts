import { Spec, LiveObject, Property, Address, OnEvent, Event, BeforeAll } from '@spec.dev/core'

/**
 * An operator of an Allo Program with a specific role.
 */
@Spec({ 
    uniqueBy: ['programAddress', 'accountAddress', 'role', 'chainId']
})
class ProgramAccount extends LiveObject {
    // Program address.
    @Property()
    programAddress: Address

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
        this.programAddress = event.origin.contractAddress
        this.accountAddress = event.data.account
        this.role = event.data.role
    }

    @OnEvent('allo.Program.RoleGranted')
    grantRole() {
        this.wasRevoked = false
    }

    @OnEvent('allo.Program.RoleRevoked')
    revokeRole() {
        this.wasRevoked = true
    }
}

export default ProgramAccount