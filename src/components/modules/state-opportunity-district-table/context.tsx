import { ReactNode, createContext, useContext, useState } from "react"

interface ContextObject {
    threshold: number
    setThreshold: (value: number) => any
}

// @ts-ignore
const Context = createContext<ContextObject>(null)

interface Props {
    children?: ReactNode
}
export function ContextProvider({ children }: Props) {
    const [threshold, setThreshold] = useState<number>(50)

    return <Context.Provider value={{ threshold, setThreshold }}>{children}</Context.Provider>
}

export const useThresholdContext = () => useContext(Context)
