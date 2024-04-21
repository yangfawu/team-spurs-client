import HorizontalDivider from "@/components/resizable-panels/horizontal-divider"
import SuspensePanel from "@/components/resizable-panels/suspense-panel"
import AssemblyView, { SUPPORTED_ASSEMBLY_VIEWS } from "@/constants/assembly-views"
import { selectActiveModules } from "@/redux/assembly"
import { useAppSelector } from "@/redux/hooks"
import { ElementType, Fragment, useMemo } from "react"
import { Panel, PanelGroup } from "react-resizable-panels"

interface Props {
    template: Record<AssemblyView, ElementType>
}
export default function Sandbox({ template }: Props) {
    const activeModules = useAppSelector(selectActiveModules)

    const minSize = useMemo(() => {
        return (100 / SUPPORTED_ASSEMBLY_VIEWS.length) * 0.9
    }, [SUPPORTED_ASSEMBLY_VIEWS])

    const defaultSize = useMemo(() => {
        return 100 / activeModules.length
    }, [activeModules])

    const saveKey = useMemo(() => {
        return `assembly:sidebar:${activeModules.join("-")}`
    }, [activeModules])

    const activeComponents = useMemo(() => {
        return activeModules.map(opt => template[opt])
    }, [activeModules, template])

    return (
        <div className="flex-1">
            <PanelGroup direction="vertical" autoSaveId={saveKey}>
                {activeComponents.length < 1 ? (
                    <Panel>
                        <div className="h-full flex items-center justify-center p-2">
                            <p className="text-gray-400 italic">no active views</p>
                        </div>
                    </Panel>
                ) : (
                    activeComponents.map((Component, i) => (
                        <Fragment key={i}>
                            {i > 0 && <HorizontalDivider />}
                            <SuspensePanel minSize={minSize} collapsible defaultSize={defaultSize}>
                                <Component />
                            </SuspensePanel>
                        </Fragment>
                    ))
                )}
            </PanelGroup>
        </div>
    )
}
