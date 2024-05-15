import { ReactNode, createContext, useContext, useState } from "react"

interface ContextObject {
    districts: string[]
    setDistricts: (districts: string[]) => any
}

// @ts-ignore
const DistrictShowcaseContext = createContext<ContextObject>(null)

interface Props {
    children: ReactNode
}
export function DistrictShowcaseProvider({ children }: Props) {
    const [districts, setDistricts] = useState<string[]>([])
    return (
        <DistrictShowcaseContext.Provider value={{ districts, setDistricts }}>
            {children}
        </DistrictShowcaseContext.Provider>
    )
}

export const useDistrictShowcase = () => useContext(DistrictShowcaseContext)
