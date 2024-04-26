import { useGeoLayerRef } from "@/contexts/geo-layer-ref"
import { ViewfinderCircleIcon } from "@heroicons/react/20/solid"
import { useCallback } from "react"
import { useMap } from "react-leaflet"
import Control from "react-leaflet-custom-control"
import ControlButton from "./control-button"

export default function GeoRefocusButton() {
    const geoRef = useGeoLayerRef()
    const map = useMap()

    const snapToTarget = useCallback(() => {
        if (!map || !geoRef.current) return
        map.fitBounds(geoRef.current.getBounds())
    }, [map, geoRef])

    return (
        <Control position="bottomright">
            <ControlButton key="refocus" Icon={ViewfinderCircleIcon} onClick={snapToTarget}>
                Refocus View
            </ControlButton>
        </Control>
    )
}
