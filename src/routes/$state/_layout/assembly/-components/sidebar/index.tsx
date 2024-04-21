import AssemblyView from "@/constants/assembly-view"
import { ElementType } from "react"
import Dropdown from "./dropdown"
import Sandbox from "./sandbox"

interface Props {
    template: Record<AssemblyView, ElementType>
}
export default function Sidebar({ template }: Props) {
    return (
        <div className="h-full flex flex-col items-stretch">
            <div className="p-2 space-y-2">
                <h3 className="text-xl font-semibold">Data Summary</h3>
                <div>
                    <h4 className="uppercase text-xs font-bold text-gray-400">view control</h4>
                    <Dropdown />
                </div>
            </div>
            <div className="h-0.5 bg-black" />
            <Sandbox template={template} />
        </div>
    )
}
