import { ReactNode, createContext, useContext, useState } from "react"

interface ContextObject {
    focus: string | null
    setFocus: (focus: string | null) => any
}
const MapFocusContext = createContext<ContextObject | null>(null)

interface Props {
    children?: ReactNode
}
export function MapFocusrovider({ children }: Props) {
    const [focus, setFocus] = useState<string | null>(null)
    return <MapFocusContext.Provider value={{ focus, setFocus }}>{children}</MapFocusContext.Provider>
}

export const useMapFocus = () => useContext(MapFocusContext)
