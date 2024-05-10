import GeoRefocusButton from "@/components/leaflet/geo-refocus-button"
import StateMapContainer from "@/components/leaflet/state-map-container"
import MapLoader from "@/components/loader/map-loader"
import { GeoLayerRefProvider } from "@/contexts/geo-layer-ref"
import "leaflet/dist/leaflet.css"
import { Suspense } from "react"
import GeoLayer from "./geo-layer"
import State from "@/constants/state"
import Group from "@/constants/group"
import HeatLevel from "@/constants/heat-level"

interface Props {
    state: State
    group: Group
    level: HeatLevel
}
export default function StateGroupHeatMap({ state, group, level }: Props) {
    return (
        <StateMapContainer preferCanvas>
            <Suspense fallback={<MapLoader />}>
                <GeoLayerRefProvider>
                    <GeoLayer state={state} group={group} level={level} />
                    <GeoRefocusButton />
                </GeoLayerRefProvider>
            </Suspense>
        </StateMapContainer>
    )
}
