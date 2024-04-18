import State from "@/constants/state"
import { ReactNode, createContext, useContext } from "react"

const CurrentStateContext = createContext<State | null>(null)

interface Props {
    value: State
    children: ReactNode
}
export function CurrentStateProvider({ value, children }: Props) {
    return <CurrentStateContext.Provider value={value}>{children}</CurrentStateContext.Provider>
}

export const useCurrentState = () => useContext(CurrentStateContext)

export function useSafeCurrentState() {
    const state = useCurrentState()

    if (!state) {
        throw new Error("useSafeCurrentState has to be used within <CurrentStateProvider>")
    }

    return state
}
