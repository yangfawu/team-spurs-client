import { ReactNode, createContext, useContext, useState } from "react"

interface ContextObject {
    plan: number | null
    setPlan: (value: number | null) => any
}

// @ts-ignore
const Context = createContext<ContextObject>(null)

interface Props {
    children?: ReactNode
}
export function ContextProvider({ children }: Props) {
    const [plan, setPlan] = useState<number | null>(null)

    return <Context.Provider value={{ plan, setPlan }}>{children}</Context.Provider>
}

export const useCompareContext = () => useContext(Context)
