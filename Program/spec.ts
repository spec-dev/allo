import { LiveObject, Spec, Timestamp, Event, Property, Address, Json, OnEvent } from '@spec.dev/core'

/**
 * A Program on the Allo protocol.
 */
@Spec({ 
    uniqueBy: ['address', 'chainId']
})
class Program extends LiveObject {
    // Address of the program.
    @Property()
    address: Address

    // Pointer to the program's off-chain metadata.
    @Property()
    metaPtr: Json

    // When the program was first created.
    @Property({ canUpdate: false })
    createdAt: Timestamp

    // ==== Event Handlers ===================

    @OnEvent('allo.ProgramFactory.ProgramCreated')
    createProgram(event: Event) {
        this.address = event.data.programContractAddress
        this.createdAt = this.blockTimestamp
        // TODO: Bind to program contract and call .metaPtr() to get it.
        this.addContractToGroup(this.address, 'allo.Program')
    }

    @OnEvent('allo.Program.RoleGranted')
    @OnEvent('allo.Program.RoleRevoked')
    trackUpdate(event: Event) {
        this.address = event.origin.contractAddress
    }
}
export default Program
