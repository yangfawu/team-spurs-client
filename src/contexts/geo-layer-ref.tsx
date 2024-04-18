import { FeatureGroup } from "leaflet"
import { ReactNode, RefObject, createContext, useContext, useRef } from "react"

const GeoLayerRefContext = createContext<RefObject<FeatureGroup> | null>(null)

interface Props {
    children?: ReactNode
}
export function GeoLayerRefProvider({ children }: Props) {
    const ref = useRef<FeatureGroup>(null)
    return <GeoLayerRefContext.Provider value={ref}>{children}</GeoLayerRefContext.Provider>
}

export function useGeoLayerRef() {
    const geoRef = useContext(GeoLayerRefContext)

    if (!geoRef) {
        throw new Error("useGeoLayerRef has to be used within <GeoLayerRefProvider>")
    }

    return geoRef
}
