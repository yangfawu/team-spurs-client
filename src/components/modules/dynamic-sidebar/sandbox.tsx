import HorizontalDivider from "@/components/resizable-panels/horizontal-divider"
import SuspensePanel from "@/components/resizable-panels/suspense-panel"
import { ElementType, Fragment, useMemo } from "react"
import { Panel, PanelGroup } from "react-resizable-panels"
import { useSidebarContext } from "./context"

interface Props {
    name: string
}
export default function Sandbox({ name }: Props) {
    const { modules, map, options } = useSidebarContext()

    const minSize = useMemo(() => (100 / options.length) * 0.9, [options])

    const defaultSize = useMemo(() => 100 / modules.length, [modules])

    const saveKey = useMemo(() => `${name}:sidebar:${modules.join("-")}`, [name, modules])

    const activeComponents = useMemo(
        () =>
            modules
                .map(map.get, map)
                .map(opt => opt?.Component)
                .filter(Boolean) as ElementType[],
        [modules, map],
    )

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
