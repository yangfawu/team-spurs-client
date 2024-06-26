import BBOXES from "@/constants/bboxes"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useMapRef } from "@/contexts/map-ref"
import "leaflet/dist/leaflet.css"
import { ReactNode } from "react"
import { MapContainer } from "react-leaflet"

interface Props {
    preferCanvas?: boolean
    children?: ReactNode
}
export default function StateMapContainer({ preferCanvas = false, children }: Props) {
    const mapRef = useMapRef()
    const state = useSafeCurrentState()

    return (
        <MapContainer
            className="relative w-full h-full"
            bounds={BBOXES[state]}
            minZoom={6}
            maxZoom={13}
            attributionControl={false}
            worldCopyJump
            ref={mapRef}
            preferCanvas={preferCanvas}
        >
            {children}
        </MapContainer>
    )
}
