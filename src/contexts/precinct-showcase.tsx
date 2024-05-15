import { ReactNode, createContext, useContext, useState } from "react"

interface ContextObject {
    precinct: string | null
    setPrecinct: (precinct: string | null) => any
}

// @ts-ignore
const PrecinctShowcaseContext = createContext<ContextObject>(null)

interface Props {
    children: ReactNode
}
export function PrecinctShowcaseProvider({ children }: Props) {
    const [precinct, setPrecinct] = useState<string | null>(null)
    return (
        <PrecinctShowcaseContext.Provider value={{ precinct, setPrecinct }}>
            {children}
        </PrecinctShowcaseContext.Provider>
    )
}

export const usePrecinctShowcase = () => useContext(PrecinctShowcaseContext)
