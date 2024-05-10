import Group from "@/constants/group"
import { ReactNode, createContext, useContext, useState } from "react"

interface ModalObject {
    id: string
    title: string
    breakdown: Record<Group, number>
}

interface ContextObject {
    modal: ModalObject | null
    setModal: (modal: ModalObject | null) => void
}

// @ts-ignore
const RegionDemographicShowcaseContext = createContext<ContextObject>(null)

interface Props {
    children: ReactNode
}
export function RegionDemographicShowcaseProvider({ children }: Props) {
    const [modal, setModal] = useState<ModalObject | null>(null)
    return (
        <RegionDemographicShowcaseContext.Provider value={{ modal, setModal }}>
            {children}
        </RegionDemographicShowcaseContext.Provider>
    )
}

export const useRegionDemographicShowcase = () => useContext(RegionDemographicShowcaseContext)
