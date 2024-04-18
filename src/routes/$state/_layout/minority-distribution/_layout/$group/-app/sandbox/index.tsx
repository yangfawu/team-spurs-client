import StateMapContainer from "@/components/leaflet/state-map-container"
import { GeoLayerRefProvider } from "@/contexts/geo-layer-ref"
import { Suspense } from "react"
import GeoLayer from "./geo-layer"
import Loader from "./loader"
import RefocusButton from "./refocus-button"

export default function Sandbox() {
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
