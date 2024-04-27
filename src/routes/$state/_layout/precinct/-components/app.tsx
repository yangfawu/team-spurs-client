import SuspensePanel from "@/components/resizable-panels/suspense-panel"
import VerticalDivider from "@/components/resizable-panels/vertical-divider"
import { PanelGroup } from "react-resizable-panels"
import Control from "./control"
import ScatterPlot from "./scatter-plot"
import Table from "./table"

export default function App() {
    return (
        <>
            <Control />
            <div className="flex-1 overflow-hidden">
                <PanelGroup direction="horizontal" autoSaveId={PrecinctSaveKey.ROOT}>
                    <SuspensePanel minSize={25} collapsible defaultSize={66}>
                        <ScatterPlot />
                    </SuspensePanel>
                    <VerticalDivider />
                    <SuspensePanel minSize={25} collapsible>
                        <Table />
                    </SuspensePanel>
                </PanelGroup>
            </div>
        </>
    )
}

enum PrecinctSaveKey {
    ROOT = "precinct:root",
}
