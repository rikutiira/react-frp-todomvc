import { createAction, createStore } from 'utils/observable'

const [ transition, transition$ ] = createAction()

const route$ = createStore(
    document.location.hash.replace('#/', ''),

    [transition$.skipDuplicates()],
    (route, newRoute) => newRoute
)

route$.onValue((route) => {
    window.location.hash = `#/${route}`
})

export default route$

export { transition }
