import Group from "@/constants/group"
import { ReactNode, createContext, useContext, useState } from "react"

interface ContextObject {
    threshold: number
    group: Group
    setThreshold: (value: number) => any
    setGroup: (value: Group) => any
}

// @ts-ignore
const Context = createContext<ContextObject>(null)

interface Props {
    children?: ReactNode
}
export function ContextProvider({ children }: Props) {
    const [threshold, setThreshold] = useState<number>(50)
    const [group, setGroup] = useState<Group>(Group.BLACK)

    return (
        <Context.Provider
            value={{
                threshold,
                setThreshold,
                group,
                setGroup,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useSettingsContext = () => useContext(Context)
