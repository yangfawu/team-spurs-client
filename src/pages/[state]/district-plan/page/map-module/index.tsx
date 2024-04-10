import GrayWorldTileLayer from "@/components/leaflet/gray-world-tile-layer"
import BBOXES from "@/constants/bboxes"
import useSelectedState from "@/hooks/use-selected-state"
import { FeatureGroup, Map } from "leaflet"
import "leaflet/dist/leaflet.css"
import { RefObject, useRef } from "react"
import { MapContainer } from "react-leaflet"
import GeoLayer from "./geo-layer"
import RefocusButton from "./refocus-button"

interface Props {
    mapRef: RefObject<Map>
}
export default function MapModule({ mapRef }: Props) {
    const state = useSelectedState()
    const geoRef = useRef<FeatureGroup>(null)

    return (
        <MapContainer
            className="w-full h-full"
            bounds={BBOXES[state]}
            minZoom={6}
            maxZoom={13}
            attributionControl={false}
            worldCopyJump
            ref={mapRef}
        >
            <GrayWorldTileLayer />
            <GeoLayer geoRef={geoRef} />
            <RefocusButton geoRef={geoRef} />
        </MapContainer>
    )
}
