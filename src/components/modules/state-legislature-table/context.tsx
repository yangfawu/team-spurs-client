import Group from "@/constants/group"
import Party from "@/constants/party"
import { ReactNode, createContext, useContext, useState } from "react"

interface ContextObject {
    groupFilter: Group[]
    partyFilter: Party[]
    setGroupFilter: (groups: Group[]) => any
    setPartyFilter: (parties: Party[]) => any
}

// @ts-ignore
const Context = createContext<ContextObject>(null)

interface Props {
    children?: ReactNode
}
export function ContextProvider({ children }: Props) {
    const [groupFilter, setGroupFilter] = useState<Group[]>([])
    const [partyFilter, setPartyFilter] = useState<Party[]>([])

    return (
        <Context.Provider
            value={{
                groupFilter,
                partyFilter,
                setGroupFilter,
                setPartyFilter,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useFilterContext = () => useContext(Context)
