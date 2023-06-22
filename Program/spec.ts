import { LiveObject, Spec, Timestamp, Event, Property, Address, OnEvent } from '@spec.dev/core'

/**
 * A Program on the Allo protocol.
 */
@Spec({ 
    uniqueBy: ['address', 'chainId']
})
class Program extends LiveObject {
    // Address of the program
    @Property()
    address: Address

	@Property({ canUpdate: false })
    createdAt: Timestamp

	@Property()
    updatedAt: Timestamp

    // ==== Event Handlers ===================

    @OnEvent('allo.ProgramFactory.ProgramCreated')
    programCreated(event: Event) {
        this.address = event.data.programContractAddress
        this.createdAt = event.data.blockTimestamp
        this.addContractToGroup(this.address, 'allo.Program')
    }

    @OnEvent('allo.Program.RoleGranted')
    handleRoleGranted(event: Event) {
        this.updatedAt = event.data.blockTimestamp
    }

    @OnEvent('allo.Program.RoleRevoked')
    handleRoleRevoked(event: Event) {
        this.updatedAt = event.data.blockTimestamp
    }

}
export default Program
