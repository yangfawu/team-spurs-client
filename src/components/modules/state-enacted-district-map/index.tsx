import DefaultTileLayer from "@/components/leaflet/default-tile-layer"
import GeoRefocusButton from "@/components/leaflet/geo-refocus-button"
import StateMapContainer from "@/components/leaflet/state-map-container"
import MapLoader from "@/components/loader/map-loader"
import State from "@/constants/state"
import { GeoLayerRefProvider } from "@/contexts/geo-layer-ref"
import { Suspense } from "react"
import GeoLayer from "./geo-layer"

interface Props {
    state: State
}
export default function StateEnactedDistrictMap({ state }: Props) {
    return (
        <StateMapContainer>
            <DefaultTileLayer />
            <Suspense fallback={<MapLoader />}>
                <GeoLayerRefProvider>
                    <GeoLayer state={state} />
                    <GeoRefocusButton />
                </GeoLayerRefProvider>
            </Suspense>
        </StateMapContainer>
    )
}
