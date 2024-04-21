import AssemblyView, { ASSEMBLY_VIEW_TO_NAME } from "@/constants/assembly-views"

export default function Representation() {
    return (
        <div className="h-full p-2">
            <h3>{ASSEMBLY_VIEW_TO_NAME[AssemblyView.REPRESENTATION]}</h3>
        </div>
    )
}
