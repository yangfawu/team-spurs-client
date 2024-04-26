import GeoRefocusButton from "@/components/leaflet/geo-refocus-button"
import StateMapContainer from "@/components/leaflet/state-map-container"
import MapLoader from "@/components/loader/map-loader"
import { GeoLayerRefProvider } from "@/contexts/geo-layer-ref"
import { Suspense } from "react"
import { LayersControl } from "react-leaflet"
import EnactedLayer from "./enacted-layer"
import SeawulfLayer from "./seawulf-layer"

export default function Map() {
    return (
        <StateMapContainer>
            <Suspense fallback={<MapLoader />}>
                <LayersControl position="topright">
                    <LayersControl.Overlay name="Currently Enacted Plan" checked>
                        <GeoLayerRefProvider>
                            <EnactedLayer />
                            <GeoRefocusButton />
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
