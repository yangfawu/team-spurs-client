import Group from "@/constants/group"
import HeatLevel from "@/constants/heat-level"
import { ReactNode, createContext, useContext, useState } from "react"

interface HeatSettingsContextObject {
    group: Group
    level: HeatLevel
    setGroup: (group: Group) => any
    setLevel: (level: HeatLevel) => any
}

// @ts-ignore
const HeatSettingsContext = createContext<HeatSettingsContextObject>(null)

interface Props {
    children?: ReactNode
}
export function HeatSettingsProvider({ children }: Props) {
    const [group, setGroup] = useState<Group>(Group.WHITE)
    const [level, setLevel] = useState<HeatLevel>(HeatLevel.PRECINCT)

    return (
        <HeatSettingsContext.Provider
            value={{
                group,
                level,
                setGroup,
                setLevel,
            }}
        >
            {children}
        </HeatSettingsContext.Provider>
    )
}

export const useHeatSettings = () => useContext(HeatSettingsContext)
