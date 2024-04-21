import HorizontalDivider from "@/components/resizable-panels/horizontal-divider"
import SuspensePanel from "@/components/resizable-panels/suspense-panel"
import VerticalDivider from "@/components/resizable-panels/vertical-divider"
import AssemblyView from "@/constants/assembly-view"
import { useMapRef } from "@/contexts/map-ref"
import useRedrawMap from "@/hooks/use-redraw-map"
import { ElementType, lazy } from "react"
import { Panel, PanelGroup } from "react-resizable-panels"
import Legislature from "./legislature"
import Map from "./map"
import Sidebar from "./sidebar"

const MODULE_TEMPLATE: Record<AssemblyView, ElementType> = {
    [AssemblyView.REDISTRICTING]: lazy(() => import("./redistricting")),
    [AssemblyView.REPRESENTATION]: lazy(() => import("./representation")),
    [AssemblyView.STATE_POPULATION]: lazy(() => import("./state-population")),
    [AssemblyView.STATE_VOTER]: lazy(() => import("./state-voter")),
}

export default function App() {
    const mapRef = useMapRef()
    const redrawMap = useRedrawMap(mapRef)

    return (
        <div className="flex-1">
            <PanelGroup direction="horizontal" autoSaveId={AssemblySaveKey.ROOT}>
                <Panel minSize={20} defaultSize={70} collapsible onResize={redrawMap}>
                    <PanelGroup direction="vertical" autoSaveId={AssemblySaveKey.LEFT}>
                        <SuspensePanel
                            className="relative"
                            minSize={25}
                            collapsible
                            defaultSize={80}
                            onResize={redrawMap}
                        >
                            <Map />
                        </SuspensePanel>
                        <HorizontalDivider />
                        <SuspensePanel minSize={25} collapsible>
                            <Legislature />
                        </SuspensePanel>
                    </PanelGroup>
                </Panel>
                <VerticalDivider />
                <Panel minSize={20} maxSize={40} collapsible>
                    <Sidebar template={MODULE_TEMPLATE} />
                </Panel>
            </PanelGroup>
        </div>
    )
}

enum AssemblySaveKey {
    ROOT = "assembly:root",
    LEFT = "assembly:left",
    // RIGHT = "assembly:right",
}
