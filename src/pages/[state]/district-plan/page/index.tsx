import Representatives from "@/components/module/representatives"
import StateDemographic from "@/components/module/state-demographic"
import { DistrictPlanLayout } from "@/constants/panel-layout"
import useRedrawMap from "@/hooks/use-redraw-map"
import { Map } from "leaflet"
import { useRef } from "react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import DistrictDemographic from "./district-demographic"
import Ensemble from "./ensemble"
import Sandbox from "./sandbox"

export default function Page() {
    const mapRef = useRef<Map>(null)
    const redrawMap = useRedrawMap(mapRef)

    return (
        <div className="flex-1">
            <PanelGroup direction="horizontal" autoSaveId={DistrictPlanLayout.ROOT}>
                <Panel minSize={20} defaultSize={70} collapsible onResize={redrawMap}>
                    <PanelGroup direction="vertical" autoSaveId={DistrictPlanLayout.LEFT}>
                        <Panel className="relative" minSize={25} collapsible defaultSize={80} onResize={redrawMap}>
                            <Sandbox mapRef={mapRef} />
                        </Panel>
                        <PanelResizeHandle className="bg-gray-800 h-0.5" />
                        <Panel minSize={25} collapsible>
                            <Representatives mapRef={mapRef} />
                        </Panel>
                    </PanelGroup>
                </Panel>
                <PanelResizeHandle className="bg-gray-800 w-0.5" />
                <Panel minSize={20} maxSize={40} collapsible>
                    <PanelGroup direction="vertical" autoSaveId={DistrictPlanLayout.RIGHT}>
                        <Panel minSize={25} collapsible defaultSize={33}>
                            <StateDemographic />
                        </Panel>
                        <PanelResizeHandle className="bg-gray-800 h-0.5" />
                        <Panel minSize={25} collapsible defaultSize={33}>
                            <DistrictDemographic />
                        </Panel>
                        <PanelResizeHandle className="bg-gray-800 h-0.5" />
                        <Panel minSize={25} collapsible>
                            <Ensemble />
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </div>
    )
}
