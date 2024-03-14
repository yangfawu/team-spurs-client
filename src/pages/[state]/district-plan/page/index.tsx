import { DistrictPlanLayout } from "@/constants/panel-layout"
import { Map } from "leaflet"
import { useMemo, useRef } from "react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import MapModule from "./map-module"
import TableModule from "./table-module"

export default function Page() {
    const mapRef = useRef<Map>(null)

    const updateMap = useMemo(() => {
        let tid: number | undefined = undefined
        return () => {
            if (tid !== undefined) window.clearTimeout(tid)
            tid = window.setTimeout(() => {
                mapRef.current?.invalidateSize({
                    animate: true,
                    pan: true,
                })
            }, 150)
        }
    }, [mapRef])

    return (
        <div className="flex-1">
            <PanelGroup
                direction="horizontal"
                autoSaveId={DistrictPlanLayout.ROOT}
            >
                <Panel
                    minSize={10}
                    defaultSize={70}
                    collapsible
                    onResize={updateMap}
                >
                    <PanelGroup
                        direction="vertical"
                        autoSaveId={DistrictPlanLayout.LEFT}
                    >
                        <Panel
                            className="relative"
                            minSize={10}
                            collapsible
                            defaultSize={80}
                            onResize={updateMap}
                        >
                            <MapModule mapRef={mapRef} />
                        </Panel>
                        <PanelResizeHandle className="bg-gray-800 h-0.5" />
                        <Panel minSize={10} collapsible>
                            <TableModule />
                        </Panel>
                    </PanelGroup>
                </Panel>
                <PanelResizeHandle className="bg-gray-800 w-0.5" />
                <Panel minSize={20} maxSize={30} collapsible>
                    <div>
                        <h3>Charts goes here</h3>
                    </div>
                </Panel>
            </PanelGroup>
        </div>
    )
}
