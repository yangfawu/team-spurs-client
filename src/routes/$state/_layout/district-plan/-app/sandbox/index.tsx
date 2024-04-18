import GrayWorldTileLayer from "@/components/leaflet/gray-world-tile-layer"
import BBOXES from "@/constants/bboxes"
import Mode from "@/constants/mode"
import { useSafeCurrentState } from "@/contexts/current-state"
import { GeoLayerRefProvider } from "@/contexts/geo-layer-ref"
import { useMapRef } from "@/contexts/map-ref"
import "leaflet/dist/leaflet.css"
import { MapContainer } from "react-leaflet"
import GeoLayer from "./geo-layer"
import RefocusButton from "./refocus-button"
import { Suspense } from "react"

export default function Sandbox() {
    const state = useSafeCurrentState()
    const mapRef = useMapRef()

    return (
        <MapContainer
            key={Mode.DISTRICT_PLAN}
            className="w-full h-full"
            bounds={BBOXES[state]}
            minZoom={6}
            maxZoom={13}
            attributionControl={false}
            worldCopyJump
            ref={mapRef}
        >
            <GrayWorldTileLayer />
            <Suspense>
                <GeoLayerRefProvider>
                    <GeoLayer />
                    <RefocusButton />
                </GeoLayerRefProvider>
            </Suspense>
        </MapContainer>
    )
}
