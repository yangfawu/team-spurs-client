import ControlButton from "@/components/leaflet/control-button"
import useSelectedState from "@/hooks/use-selected-state"
import { useGetCountiesQuery } from "@/redux/counties-api-slice"
import { ViewfinderCircleIcon } from "@heroicons/react/20/solid"
import L from "leaflet"
import { useCallback, useEffect, useMemo } from "react"
import { useMap } from "react-leaflet"
import Control from "react-leaflet-custom-control"

export default function RefocusButton() {
    const map = useMap()

    const [state_code] = useSelectedState()
    const { currentData, isSuccess } = useGetCountiesQuery(state_code)

    const bounds = useMemo(() => {
        if (!isSuccess || !currentData?.features) return null

        // @ts-ignore
        return L.geoJSON(currentData).getBounds()
    }, [isSuccess, currentData])

    const snapToTarget = useCallback(() => {
        if (!map || !bounds) return
        map.fitBounds(bounds)
    }, [map, bounds])

    useEffect(() => {
        console.log("called")
        snapToTarget()
    }, [snapToTarget])

    return (
        <Control position="bottomright">
            <ControlButton Icon={ViewfinderCircleIcon} onClick={snapToTarget}>
                Refocus View
            </ControlButton>
        </Control>
    )
}
