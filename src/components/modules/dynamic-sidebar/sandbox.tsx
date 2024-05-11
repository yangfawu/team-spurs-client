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

    const minSize = useMemo(() => (100 / options.length) * 0.5, [options])

    const defaultSize = useMemo(() => 100 / modules.length, [modules])

    const saveKey = useMemo(() => `${name}:sidebar:${modules.join("-")}`, [name, modules])

    const activeComponents: [string, ElementType][] = useMemo(
        () =>
            modules.map(tag => [tag, map.get(tag)?.Component] as const).filter(([, Component]) => !!Component) as [
                string,
                ElementType,
            ][],
        [modules, map],
    )

    return (
        <div className="flex-1">
            <PanelGroup direction="vertical" autoSaveId={saveKey}>
                {activeComponents.length < 1 ? (
                    <Panel id={`${name}-???`} order={1}>
                        <div className="h-full flex items-center justify-center p-2">
                            <p className="text-gray-400 italic">no active views</p>
                        </div>
                    </Panel>
                ) : (
                    activeComponents.map(([tag, Component], i) => (
                        <Fragment key={i}>
                            {i > 0 && <HorizontalDivider />}
                            <SuspensePanel
                                id={`${name}-${tag}`}
                                order={i + 1}
                                minSize={minSize}
                                collapsible
                                defaultSize={defaultSize}
                            >
                                <Component />
                            </SuspensePanel>
                        </Fragment>
                    ))
                )}
            </PanelGroup>
        </div>
    )
}
