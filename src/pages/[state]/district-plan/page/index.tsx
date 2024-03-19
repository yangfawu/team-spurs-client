import { DistrictPlanLayout } from "@/constants/panel-layout"
import { Map } from "leaflet"
import { useMemo, useRef } from "react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import EnsembleModule from "./ensemble-module"
import MapModule from "./map-module"
import PopulationModule from "./population-module"
import TableModule from "./table-module"
import DistrictModule from "./district-module"

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
            <PanelGroup direction="horizontal" autoSaveId={DistrictPlanLayout.ROOT}>
                <Panel minSize={20} defaultSize={70} collapsible onResize={updateMap}>
                    <PanelGroup direction="vertical" autoSaveId={DistrictPlanLayout.LEFT}>
                        <Panel className="relative" minSize={25} collapsible defaultSize={80} onResize={updateMap}>
                            <MapModule mapRef={mapRef} />
                        </Panel>
                        <PanelResizeHandle className="bg-gray-800 h-0.5" />
                        <Panel minSize={25} collapsible>
                            <TableModule mapRef={mapRef}/>
                        </Panel>
                    </PanelGroup>
                </Panel>
                <PanelResizeHandle className="bg-gray-800 w-0.5" />
                <Panel minSize={20} maxSize={40} collapsible>
                    <PanelGroup direction="vertical" autoSaveId={DistrictPlanLayout.RIGHT}>
                        <Panel minSize={25} collapsible defaultSize={33}>
                            <PopulationModule />
                        </Panel>
                        <PanelResizeHandle className="bg-gray-800 h-0.5" />
                        <Panel minSize={25} collapsible defaultSize={33}>
                            <DistrictModule />
                        </Panel>
                        <PanelResizeHandle className="bg-gray-800 h-0.5" />
                        <Panel minSize={25} collapsible>
                            <EnsembleModule />
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </div>
    )
}
