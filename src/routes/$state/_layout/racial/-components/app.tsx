import DynamicSidebar from "@/components/modules/dynamic-sidebar"
import { ModuleOption } from "@/components/modules/dynamic-sidebar/types"
import SuspensePanel from "@/components/resizable-panels/suspense-panel"
import VerticalDivider from "@/components/resizable-panels/vertical-divider"
import { HeatSettingsProvider } from "@/contexts/heat-settings"
import { useMapRef } from "@/contexts/map-ref"
import { RegionDemographicShowcaseProvider } from "@/contexts/region-demographic-showcase"
import useRedrawMap from "@/hooks/use-redraw-map"
import { lazy } from "react"
import { Panel, PanelGroup } from "react-resizable-panels"
import Map from "./map"
import { PrecinctShowcaseProvider } from "@/contexts/precinct-showcase"

const MODULE_OPTIONS: ModuleOption[] = [
    {
        id: "breakdown",
        name: "Region Demographic Breakdown",
        Component: lazy(() => import("./region-breakdown")),
    },
    {
        id: "scatter",
        name: "Gingles Analysis",
        Component: lazy(() => import("./scatter-plot")),
    },
    {
        id: "table",
        name: "Precinct Vote Share",
        Component: lazy(() => import("./table")),
    },
    {
        id: "box",
        name: "Box & Whisker Analysis",
        Component: lazy(() => import("./box-plot")),
    },
    {
        id: "ei",
        name: "Ecological Inference",
        Component: lazy(() => import("./ecological-inference")),
    },
]

export default function App() {
    const mapRef = useMapRef()
    const redrawMap = useRedrawMap(mapRef)

    return (
        <div className="flex-1">
            <HeatSettingsProvider>
                <RegionDemographicShowcaseProvider>
                    <PanelGroup direction="horizontal" autoSaveId={HeatSaveKey.ROOT}>
                        <SuspensePanel
                            className="relative"
                            minSize={25}
                            collapsible
                            defaultSize={80}
                            onResize={redrawMap}
                        >
                            <Map />
                        </SuspensePanel>
                        <VerticalDivider />
                        <Panel minSize={20} maxSize={50} collapsible>
                            <PrecinctShowcaseProvider>
                                <DynamicSidebar name="racial" options={MODULE_OPTIONS} initialModules={["breakdown"]} />
                            </PrecinctShowcaseProvider>
                        </Panel>
                    </PanelGroup>
                </RegionDemographicShowcaseProvider>
            </HeatSettingsProvider>
        </div>
    )
}

enum HeatSaveKey {
    ROOT = "heat:root",
    FOOTER = "heat:footer",
}
