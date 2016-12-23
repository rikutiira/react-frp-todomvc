import R from 'ramda'
import { createAction, createStore } from 'utils/observable'

let [ routeChange, routeChange$ ] = createAction()

window.addEventListener('hashchange', ({ newURL }) => {
    const route = newURL.split('#/')[1] || ''

    routeChange(route)
});

export default createStore(
    document.location.hash.replace('#/', ''),

    [routeChange$.skipDuplicates()],
    (route, newRoute) => newRoute
)
