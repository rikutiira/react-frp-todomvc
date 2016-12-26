// Works similar to Bacon.update: https://github.com/baconjs/bacon.js/#bacon-update
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

// Creates a stream and a function which can be called to push values into the stream
export const createAction = () => {
    let _emitter

    const stream = Kefir.stream((__emitter) => _emitter = __emitter)
    const emitter = (...args) => {
        if (_emitter) {
            _emitter.value(...args)
        }
    }

    return [ emitter, stream ]
}

// Same as createAction but returns a property instead of stream
export const createActionProperty = (currentValueF) => {
    const [ action, stream$ ] = createAction()

    return currentValueF
        ? [ action, stream$.toProperty(currentValueF) ]
        : [ action, stream$.toProperty() ]
}

// Same as update but exported as explicit function as it should be used to create stores
export const createStore = update
