import GrayTileLayer from "@/components/leaflet/gray-tile-layer"
import BBOXES from "@/constants/bboxes"
import { useSafeCurrentState } from "@/contexts/current-state"
import { GeoLayerRefProvider } from "@/contexts/geo-layer-ref"
import "leaflet/dist/leaflet.css"
import { Suspense } from "react"
import { MapContainer } from "react-leaflet"
import GeoLayer from "./geo-layer"
import Loader from "./loader"
import RefocusButton from "./refocus-button"

export default function Map() {
    const state = useSafeCurrentState()

    return (
        <MapContainer
            className="relative flex-1"
            bounds={BBOXES[state]}
            minZoom={6}
            maxZoom={13}
            attributionControl={false}
            worldCopyJump
        >
            <GrayTileLayer />
            <Suspense fallback={<Loader />}>
                <GeoLayerRefProvider>
                    <GeoLayer />
                    <RefocusButton />
                </GeoLayerRefProvider>
            </Suspense>
        </MapContainer>
    )
}
