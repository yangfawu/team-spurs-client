import { DistrictPlanLayout } from "@/constants/panel-layout"
import useSelectedState from "@/hooks/use-selected-state"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import { Link } from "react-router-dom"

export default function Page() {
    const [, state_name] = useSelectedState()

    return (
        <div className="flex-1">
            <PanelGroup
                direction="horizontal"
                autoSaveId={DistrictPlanLayout.ROOT}
            >
                <Panel minSize={10} defaultSize={70} collapsible>
                    <PanelGroup
                        direction="vertical"
                        autoSaveId={DistrictPlanLayout.LEFT}
                    >
                        <Panel minSize={10} collapsible defaultSize={80}>
                            <div>
                                <h3>
                                    You have selected to view the{" "}
                                    <b>district plan</b> of <b>{state_name}</b>
                                </h3>
                                <p>
                                    <Link to="/">Reset</Link>
                                </p>
                            </div>
                        </Panel>
                        <PanelResizeHandle className="bg-gray-800 h-0.5" />
                        <Panel minSize={10} collapsible>
                            <div>
                                <h3>Table goes here</h3>
                            </div>
                        </Panel>
                    </PanelGroup>
                </Panel>
                <PanelResizeHandle className="bg-gray-800 w-0.5" />
                <Panel minSize={10} collapsible>
                    <div>
                        <h3>Charts goes here</h3>
                    </div>
                </Panel>
            </PanelGroup>
        </div>
    )
}
