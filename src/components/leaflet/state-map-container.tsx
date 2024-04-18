import BBOXES from "@/constants/bboxes"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useMapRef } from "@/contexts/map-ref"
import "leaflet/dist/leaflet.css"
import { ReactNode } from "react"
import { MapContainer, TileLayer } from "react-leaflet"

interface Props {
    children?: ReactNode
}
export default function StateMapContainer({ children }: Props) {
    const mapRef = useMapRef()
    const state = useSafeCurrentState()

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
            <TileLayer
                attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
            />
            {children}
        </MapContainer>
    )
}
