import { Map } from "leaflet"
import { RefObject, useMemo } from "react"

export default function useRedrawMap(ref: RefObject<Map>) {
    const redrawMap = useMemo(() => {
        let tid: number | undefined = undefined
        return () => {
            if (tid !== undefined) window.clearTimeout(tid)
            tid = window.setTimeout(() => {
                ref.current?.invalidateSize({
                    animate: true,
                    pan: true,
                })
            }, 150)
        }
    }, [ref])

    return redrawMap
}
