import GeoRefocusButton from "@/components/leaflet/geo-refocus-button"
import StateMapContainer from "@/components/leaflet/state-map-container"
import MapLoader from "@/components/loader/map-loader"
import { GeoLayerRefProvider } from "@/contexts/geo-layer-ref"
import { Suspense } from "react"
import GeoLayer from "./geo-layer"

export default function Map() {
    return (
        <StateMapContainer>
            <Suspense fallback={<MapLoader />}>
                <GeoLayerRefProvider>
                    <GeoLayer />
                    <GeoRefocusButton />
                </GeoLayerRefProvider>
            </Suspense>
        </StateMapContainer>
    )
}
