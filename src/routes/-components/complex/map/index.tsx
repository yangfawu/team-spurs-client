import GeoRefocusButton from "@/components/leaflet/geo-refocus-button"
import GrayTileLayer from "@/components/leaflet/gray-tile-layer"
import MapLoader from "@/components/loader/map-loader"
import { GeoLayerRefProvider } from "@/contexts/geo-layer-ref"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Suspense } from "react"
import { MapContainer } from "react-leaflet"
import GeoLayer from "./geo-layer"

export default function Map() {
    return (
        <MapContainer
            className="w-full flex-1"
            attributionControl={false}
            minZoom={4}
            maxZoom={10}
            bounds={UNITED_STATES_BBOX}
            maxBounds={UNITED_STATES_BBOX}
            maxBoundsViscosity={1.0}
            worldCopyJump
        >
            <GrayTileLayer />
            <Suspense fallback={<MapLoader />}>
                <GeoLayerRefProvider>
                    <GeoLayer />
                    <GeoRefocusButton />
                </GeoLayerRefProvider>
            </Suspense>
        </MapContainer>
    )
}

// Numbers sourced from https://github.com/sandstrom/country-bounding-boxes/blob/b3c178f2c992d3380583d0e33736dcc483f5bb80/bounding-boxes.json#L165
const UNITED_STATES_BBOX = L.latLngBounds(L.latLng(24.396308, -125.0), L.latLng(49.384358, -66.93457))
