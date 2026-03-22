export type StreamableResultListState = 'uninitialized'

export class StreamableResultList<ResultType> {
    state: StreamableResultListState = 'uninitialized'

    private results = []

    constructor() {}
}

// ## JUST FOR TESTING
const r = new StreamableResultList<{
    name: string
    artist: string
}>()

// First result arrives
const r1 = r.publish({
    name: 'Bella Napoli'
})
// Now artist name arrives
// r1.republish() // would replace result
r1.extend({
    artist: 'Some artist',
    // not required but possible: also extend by existing properties
    // name: 'Bella Napoli'
    // or update existing prop:
    name: 'Bella Napoli XTended'
})

// ## On the client side
r.watch((list) => {
    // Re-rendered list
    // not optimal bc retrigger re rendering ever result
    // or react will catch it not sure
    // then we only needed to serialize the updates into a transmittable form
})

const domLikeResultArray = []
r1.subscribe((handle) => {
    // Once handle arrives it's time to append
    const idx = domLikeResultArray.push(handle.data) - 1

    // On update
    handle.onUpdate((data) => {
        domLikeResultArray[idx] = data
    })

    handle.onDestroy(() => {
        domLikeResultArray[idx] = null
    })
})
