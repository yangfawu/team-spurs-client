import StateMapContainer from "@/components/leaflet/state-map-container"
import { GeoLayerRefProvider } from "@/contexts/geo-layer-ref"
import { Suspense } from "react"
import { LayersControl } from "react-leaflet"
import EnactedLayer from "./enacted-layer"
import Loader from "./loader"
import RefocusButton from "./refocus-button"
import SeawulfLayer from "./seawulf-layer"

export default function Map() {
    return (
        <StateMapContainer>
            <Suspense fallback={<Loader />}>
                <LayersControl position="topright">
                    <LayersControl.Overlay name="Currently Enacted Plan" checked>
                        <GeoLayerRefProvider>
                            <EnactedLayer />
                            <RefocusButton />
                        </GeoLayerRefProvider>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Selected Seawulf Plan" checked>
                        <SeawulfLayer />
                    </LayersControl.Overlay>
                </LayersControl>
            </Suspense>
        </StateMapContainer>
    )
}
