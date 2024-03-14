import ControlButton from "@/components/leaflet/control-button"
import { ViewfinderCircleIcon } from "@heroicons/react/20/solid"
import { FeatureGroup } from "leaflet"
import { RefObject, useCallback } from "react"
import { useMap } from "react-leaflet"
import Control from "react-leaflet-custom-control"

interface Props {
    geoRef: RefObject<FeatureGroup>
}
export default function RefocusButton({ geoRef }: Props) {
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
