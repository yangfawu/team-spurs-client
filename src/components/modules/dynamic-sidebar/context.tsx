import { ReactNode, createContext, useContext, useMemo, useState } from "react"
import { ModuleOption } from "./types"

interface ContextObject {
    modules: string[]
    setModules: (modules: string[]) => any
    options: ModuleOption[]
    map: Map<string, ModuleOption>
}

// @ts-ignore
const Context = createContext<ContextObject>(null)

interface Props {
    initialModules?: string[]
    options: ModuleOption[]
    children?: ReactNode
}
export function ContextProvider({ initialModules, options, children }: Props) {
    const [activeModules, setModules] = useState<string[]>(initialModules ?? [])

    const map = useMemo(() => new Map(options.map(opt => [opt.id, opt])), [options])

    return (
        <Context.Provider
            value={{
                modules: activeModules,
                setModules,
                options,
                map,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useSidebarContext = () => useContext(Context)
