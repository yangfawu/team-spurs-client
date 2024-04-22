import StateMapContainer from "@/components/leaflet/state-map-container"
import { GeoLayerRefProvider } from "@/contexts/geo-layer-ref"
import "leaflet/dist/leaflet.css"
import { Suspense } from "react"
import GeoLayer from "./geo-layer"
import Loader from "./loader"
import RefocusButton from "./refocus-button"

export default function Map() {
    return (
        <StateMapContainer>
            <Suspense fallback={<Loader />}>
                <GeoLayerRefProvider>
                    <GeoLayer />
                    <RefocusButton />
                </GeoLayerRefProvider>
            </Suspense>
        </StateMapContainer>
    )
}
