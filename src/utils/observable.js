import Kefir from 'kefir'
import R from 'ramda'

export const update = (initialValue, ...inputs) => {
    return Kefir.merge(R.splitEvery(2, inputs).map(([inputObss, foldF]) => {
        const inputObssWithIdx = inputObss.map((obs, idx) => ({ obs, idx }))
        const streams = inputObssWithIdx.filter(({ obs }) => obs instanceof Kefir.Stream)
        const properties = inputObssWithIdx.filter(({ obs }) => obs instanceof Kefir.Property)

        return Kefir.combine(
            streams.map(R.prop('obs')),
            properties.map(R.prop('obs')),
            (...args) => (prev) => foldF(prev, ...R.sortBy(R.prop('idx'), args))
        )
    })).scan((prev, update) => update(prev), initialValue)
}

export const createAction = () => {
    let _emitter

    const stream = Kefir.stream((__emitter) => _emitter = __emitter)
    const emitter = (...args) => _emitter.value(...args)

    return [ emitter, stream ]
}

export const createStore = update
