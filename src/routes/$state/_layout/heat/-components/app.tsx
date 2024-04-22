import HorizontalDivider from "@/components/resizable-panels/horizontal-divider"
import SuspensePanel from "@/components/resizable-panels/suspense-panel"
import VerticalDivider from "@/components/resizable-panels/vertical-divider"
import { useMapRef } from "@/contexts/map-ref"
import useRedrawMap from "@/hooks/use-redraw-map"
import { Panel, PanelGroup } from "react-resizable-panels"
import Control from "./control"
import Legend from "./legend"
import Map from "./map"
import Modal from "./modal"

export default function App() {
    const mapRef = useMapRef()
    const redrawMap = useRedrawMap(mapRef)

    return (
        <>
            <div className="flex-1">
                <PanelGroup direction="vertical" autoSaveId={HeatSaveKey.ROOT}>
                    <SuspensePanel className="relative" minSize={50} collapsible defaultSize={85} onResize={redrawMap}>
                        <Map />
                    </SuspensePanel>
                    <HorizontalDivider />
                    <Panel minSize={10} defaultSize={15} collapsible onResize={redrawMap}>
                        <PanelGroup direction="horizontal" autoSaveId={HeatSaveKey.FOOTER}>
                            <SuspensePanel minSize={25} collapsible>
                                <Control />
                            </SuspensePanel>
                            <VerticalDivider />
                            <SuspensePanel minSize={25} collapsible defaultSize={75}>
                                <Legend />
                            </SuspensePanel>
                        </PanelGroup>
                    </Panel>
                </PanelGroup>
            </div>
            <Modal />
        </>
    )
}

enum HeatSaveKey {
    ROOT = "heat:root",
    FOOTER = "heat:footer",
}
