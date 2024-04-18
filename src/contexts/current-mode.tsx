import Mode from "@/constants/mode"
import { ReactNode, createContext, useContext } from "react"

const CurrentModeContext = createContext<Mode | null>(null)

interface Props {
    value: Mode
    children: ReactNode
}
export function CurrentModeProvider({ value, children }: Props) {
    return <CurrentModeContext.Provider value={value}>{children}</CurrentModeContext.Provider>
}

export const useCurrentMode = () => useContext(CurrentModeContext)

export function useSafeCurrentMode() {
    const mode = useCurrentMode()

    if (!mode) {
        throw new Error("useSafeCurrentMode has to be used within <CurrentModeProvider>")
    }

    return mode
}
