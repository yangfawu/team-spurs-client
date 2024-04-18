import Representatives from "@/components/module/representatives"
import { DistrictPlanLayout } from "@/constants/panel-layout"
import { useMapRef } from "@/contexts/map-ref"
import useRedrawMap from "@/hooks/use-redraw-map"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import DistrictDemographic from "./district-demographic"
import Sandbox from "./sandbox"
import StateDemographic from "./state-demographic"

export default function Page() {
    const mapRef = useMapRef()
    const redrawMap = useRedrawMap(mapRef)

    return (
        <div className="flex-1">
            <PanelGroup direction="horizontal" autoSaveId={DistrictPlanLayout.ROOT}>
                <Panel minSize={20} defaultSize={70} collapsible onResize={redrawMap}>
                    <PanelGroup direction="vertical" autoSaveId={DistrictPlanLayout.LEFT}>
                        <Panel className="relative" minSize={25} collapsible defaultSize={80} onResize={redrawMap}>
                            <Sandbox />
                        </Panel>
                        <PanelResizeHandle className="bg-gray-800 h-0.5" />
                        <Panel minSize={25} collapsible>
                            <Representatives />
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
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </div>
    )
}
