import { Map } from "leaflet"
import { ReactNode, RefObject, createContext, useContext, useRef } from "react"

const MapRefContext = createContext<RefObject<Map> | null>(null)

interface Props {
    children?: ReactNode
}
export function MapRefProvider({ children }: Props) {
    const ref = useRef<Map>(null)
    return <MapRefContext.Provider value={ref}>{children}</MapRefContext.Provider>
}

/**
 * `react-leaflet`'s `useMap()` only works when used inside a component within the Map container.
 * This hook allows you to access the map instance from outside the container.
 */
export function useMapRef() {
    const mapRef = useContext(MapRefContext)

    if (!mapRef) {
        throw new Error("useMapRef has to be used within <MapRefProvider>")
    }

    return mapRef
}
