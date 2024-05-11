import DynamicSidebar from "@/components/modules/dynamic-sidebar"
import { ModuleOption } from "@/components/modules/dynamic-sidebar/types"
import HorizontalDivider from "@/components/resizable-panels/horizontal-divider"
import SuspensePanel from "@/components/resizable-panels/suspense-panel"
import VerticalDivider from "@/components/resizable-panels/vertical-divider"
import { MapFocusrovider } from "@/contexts/map-focus"
import { useMapRef } from "@/contexts/map-ref"
import useRedrawMap from "@/hooks/use-redraw-map"
import { lazy } from "react"
import { Panel, PanelGroup } from "react-resizable-panels"
import Legislature from "./legislature"
import Map from "./map"

const MODULE_OPTIONS: ModuleOption[] = [
    {
        id: "redistricting",
        name: "State Redistricting",
        Component: lazy(() => import("./redistricting")),
    },
    {
        id: "state-rep",
        name: "State Representation",
        Component: lazy(() => import("./state-representaton")),
    },
    {
        id: "state-voter",
        name: "State Voter Breakdown",
        Component: lazy(() => import("./state-voter")),
    },
]

export default function App() {
    const mapRef = useMapRef()
    const redrawMap = useRedrawMap(mapRef)

    return (
        <div className="flex-1">
            <PanelGroup direction="horizontal" autoSaveId={AssemblySaveKey.ROOT}>
                <Panel minSize={20} defaultSize={70} collapsible onResize={redrawMap}>
                    <PanelGroup direction="vertical" autoSaveId={AssemblySaveKey.LEFT}>
                        <MapFocusrovider>
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
                        </MapFocusrovider>
                    </PanelGroup>
                </Panel>
                <VerticalDivider />
                <Panel minSize={20} maxSize={40} collapsible>
                    <DynamicSidebar name="summary" options={MODULE_OPTIONS} initialModules={["state-rep"]} />
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
