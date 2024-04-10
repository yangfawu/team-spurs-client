import L from "leaflet"
import State from "./state"

// sourced from https://gist.github.com/Duder-onomy/2bdc789c3711d2e8364cbdb219db8bf8
const NEW_JERSEY = L.latLngBounds(L.latLng(38.9283, -75.5636), L.latLng(41.3572, -73.8851))
const VIRGINIA = L.latLngBounds(L.latLng(36.5408, -83.6753), L.latLng(39.466, -75.1664))

const BBOXES: Record<State, typeof NEW_JERSEY> = {
    [State.NJ]: NEW_JERSEY,
    [State.VA]: VIRGINIA,
}

export default BBOXES
