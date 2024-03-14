import GrayWorldTileLayer from "@/components/leaflet/gray-world-tile-layer"
import RefocusButton from "@/components/leaflet/refocus-button"
import useSelectedState from "@/hooks/use-selected-state"
import { Map } from "leaflet"
import "leaflet/dist/leaflet.css"
import { Ref } from "react"
import { MapContainer } from "react-leaflet"
import Control from "react-leaflet-custom-control"

interface Props {
    mapRef?: Ref<Map>
}
export default function MapModule({ mapRef }: Props) {
    const [state_code] = useSelectedState()

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
            <Control position="bottomright">
                <RefocusButton state={state_code} />
            </Control>
        </MapContainer>
    )
}
