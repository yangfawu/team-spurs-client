import GeoRefocusButton from "@/components/leaflet/geo-refocus-button"
import GrayTileLayer from "@/components/leaflet/gray-tile-layer"
import StateMapContainer from "@/components/leaflet/state-map-container"
import MapLoader from "@/components/loader/map-loader"
import State from "@/constants/state"
import { GeoLayerRefProvider } from "@/contexts/geo-layer-ref"
import { Suspense } from "react"
import { LayersControl } from "react-leaflet"
import { ContextProvider } from "./context"
import EnactedLayer from "./enacted-layer"
import SeawulfParent from "./seawulf-parent"
import Settings from "./settings"

interface Props {
    state: State
}
export default function PlanCompareMap({ state }: Props) {
    return (
        <StateMapContainer preferCanvas>
            <GrayTileLayer />
            <Suspense fallback={<MapLoader />}>
                <ContextProvider>
                    <Settings state={state} />
                    <LayersControl position="bottomleft">
                        <LayersControl.Overlay name="Currently Enacted Plan" checked>
                            <GeoLayerRefProvider>
                                <EnactedLayer state={state} />
                                <GeoRefocusButton />
                            </GeoLayerRefProvider>
                        </LayersControl.Overlay>
                        <SeawulfParent state={state} />
                    </LayersControl>
                </ContextProvider>
            </Suspense>
        </StateMapContainer>
    )
}
