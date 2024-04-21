import HorizontalDivider from "@/components/resizable-panels/horizontal-divider"
import VerticalDivider from "@/components/resizable-panels/vertical-divider"
import { useMapRef } from "@/contexts/map-ref"
import useRedrawMap from "@/hooks/use-redraw-map"
import { Panel, PanelGroup } from "react-resizable-panels"
import Map from "./map"
import LegislatureTable from "./legislature-table"

export default function App() {
    const mapRef = useMapRef()
    const redrawMap = useRedrawMap(mapRef)

    return (
        <div className="flex-1">
            <PanelGroup direction="horizontal" autoSaveId={AssemblySaveKey.ROOT}>
                <Panel minSize={20} defaultSize={70} collapsible onResize={redrawMap}>
                    <PanelGroup direction="vertical" autoSaveId={AssemblySaveKey.LEFT}>
                        <Panel className="relative" minSize={25} collapsible defaultSize={80} onResize={redrawMap}>
                            <Map />
                        </Panel>
                        <HorizontalDivider />
                        <Panel minSize={25} collapsible>
                            <LegislatureTable />
                        </Panel>
                    </PanelGroup>
                </Panel>
                <VerticalDivider />
                <Panel minSize={20} maxSize={40} collapsible>
                    <PanelGroup direction="vertical" autoSaveId={AssemblySaveKey.RIGHT}>
                        <Panel minSize={25} collapsible defaultSize={33}>
                            {/* <StateDemographic /> */}
                        </Panel>
                        <HorizontalDivider />
                        <Panel minSize={25} collapsible defaultSize={33}>
                            {/* <DistrictDemographic /> */}
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </div>
    )
}

enum AssemblySaveKey {
    ROOT = "assembly:root",
    LEFT = "assembly:left",
    RIGHT = "assembly:right",
}
