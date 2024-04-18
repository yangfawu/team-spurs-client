import Group from "@/constants/group"
import { ReactNode, createContext, useContext } from "react"

const CurrentGroupContext = createContext<Group | null>(null)

interface Props {
    value: Group
    children: ReactNode
}
export function CurrentGroupProvider({ value, children }: Props) {
    return <CurrentGroupContext.Provider value={value}>{children}</CurrentGroupContext.Provider>
}

export const useCurrentGroup = () => useContext(CurrentGroupContext)

export function useSafeCurrentGroup() {
    const mode = useCurrentGroup()

    if (!mode) {
        throw new Error("useSafeCurrentGroup has to be used within <CurrentGroupProvider>")
    }

    return mode
}
