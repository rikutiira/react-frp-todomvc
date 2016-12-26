const className = (styles) => (...args) => ({
    className: K(...args, (...clss) => {
        const classes = clss.map((cls) => typeof cls === 'string'
            ? cls
            : U.seq(cls,
                U.keys,
                U.map((key) => cls[key] && styles[key]),
                U.filter(Boolean)))

        return U.join(' ', U.flatten(classes))
    })
})

const createCb = R.curry((value, cb) => K(value, (v) => (e) => cb(v, e)))

export { className, createCb }
