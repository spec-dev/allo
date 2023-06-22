import { LiveObject, Spec, Property, Event, OnEvent, Address } from '@spec.dev/core'

/**
 * TODO
 */
@Spec({ 
    uniqueBy: ['someProperty', 'chainId'] 
})
class RoundRole extends LiveObject {
    // TODO
    @Property()
    someProperty: Address

    // ==== Event Handlers ===================

    @OnEvent('namespace.ContractName.EventName')
    onSomeEvent(event: Event) {
        this.someProperty = event.data.someProperty
    }
}

export default RoundRole