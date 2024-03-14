import GrayWorldTileLayer from "@/components/leaflet/gray-world-tile-layer"
import { Map } from "leaflet"
import "leaflet/dist/leaflet.css"
import { Ref } from "react"
import { MapContainer } from "react-leaflet"
import GeoLayer from "./geo-layer"
import Refocus from "./refocus"

interface Props {
    mapRef?: Ref<Map>
}
export default function MapModule({ mapRef }: Props) {
    return (
        <MapContainer
            className="w-full h-full"
            center={[0, 0]}
            zoom={6}
            minZoom={6}
            maxZoom={13}
            attributionControl={false}
            worldCopyJump
            ref={mapRef}
        >
            <GrayWorldTileLayer />
            <GeoLayer />
            <Refocus />
        </MapContainer>
    )
}
