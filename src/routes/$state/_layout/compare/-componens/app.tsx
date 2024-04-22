import HorizontalDivider from "@/components/resizable-panels/horizontal-divider"
import SuspensePanel from "@/components/resizable-panels/suspense-panel"
import { useMapRef } from "@/contexts/map-ref"
import useRedrawMap from "@/hooks/use-redraw-map"
import { PanelGroup } from "react-resizable-panels"
import Map from "./map"
import Precincts from "./precincts"

export default function App() {
    const mapRef = useMapRef()
    const redrawMap = useRedrawMap(mapRef)

    return (
        <div className="flex-1">
            <PanelGroup direction="vertical" autoSaveId={CompareSaveKey.ROOT}>
                <SuspensePanel className="relative" minSize={25} collapsible defaultSize={80} onResize={redrawMap}>
                    <Map />
                </SuspensePanel>
                <HorizontalDivider />
                <SuspensePanel minSize={25} collapsible>
                    <Precincts />
                </SuspensePanel>
            </PanelGroup>
        </div>
    )
}

enum CompareSaveKey {
    ROOT = "compare:root",
}
