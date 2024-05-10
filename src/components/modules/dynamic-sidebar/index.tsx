import { ContextProvider } from "./context"
import Dropdown from "./dropdown"
import Sandbox from "./sandbox"
import { ModuleOption } from "./types"

interface Props {
    name: string
    initialModules?: string[]
    options: ModuleOption[]
}
export default function DynamicSidebar({ name, initialModules, options }: Props) {
    return (
        <ContextProvider options={options} initialModules={initialModules}>
            <div className="h-full flex flex-col items-stretch">
                <div className="p-2 space-y-2">
                    <h3 className="text-sm uppercase font-bold">Settings</h3>
                    <Dropdown />
                </div>
                <div className="h-0.5 bg-black" />
                <Sandbox name={name} />
            </div>
        </ContextProvider>
    )
}
