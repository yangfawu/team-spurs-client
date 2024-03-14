import GrayWorldTileLayer from "@/components/leaflet/gray-world-tile-layer"
import { LEAFLET_COORDINATES } from "@/constants/states"
import useSelectedState from "@/hooks/use-selected-state"
import { LatLngExpression, Map } from "leaflet"
import "leaflet/dist/leaflet.css"
import { Ref, useMemo } from "react"
import { MapContainer } from "react-leaflet"
import GeoLayer from "./geo-layer"
import RefocusButton from "./refocus-button"

interface Props {
    mapRef?: Ref<Map>
}
export default function MapModule({ mapRef }: Props) {
    const [state_code] = useSelectedState()

    const [center, zoom] = useMemo(() => {
        const res = LEAFLET_COORDINATES.get(state_code)
        if (res) return [res.center, res.zoom] as const
        return [[0, 0], 6] as [LatLngExpression, number]
    }, [state_code, LEAFLET_COORDINATES])

    return (
        <MapContainer
            className="w-full h-full"
            center={center}
            zoom={zoom}
            minZoom={6}
            maxZoom={13}
            attributionControl={false}
            worldCopyJump
            ref={mapRef}
        >
            <GrayWorldTileLayer />
            <GeoLayer />
            <RefocusButton />
        </MapContainer>
    )
}
