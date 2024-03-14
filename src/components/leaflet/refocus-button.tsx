import { LEAFLET_COORDINATES, SupportedStateKey } from "@/constants/states"
import ControlButton from "./control-button"
import { ViewfinderCircleIcon } from "@heroicons/react/24/outline"
import { useCallback, useEffect, useMemo } from "react"
import { useMap } from "react-leaflet"

interface Props {
    state: SupportedStateKey
}
export default function RefocusButton({ state }: Props) {
    const map = useMap()

    const target = useMemo(() => LEAFLET_COORDINATES.get(state), [state])

    useEffect(() => {
        if (!target) return
        map.setView(target.center, target.zoom)
    }, [map, target])

    const snapToTarget = useCallback(() => {
        if (!target) return
        map.setView(target.center, target.zoom, { animate: true })
    }, [map, target])

    if (!target) return null

    return (
        <ControlButton Icon={ViewfinderCircleIcon} onClick={snapToTarget}>
            Refocus View
        </ControlButton>
    )
}
