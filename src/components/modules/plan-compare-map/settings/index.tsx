import State from "@/constants/state"
import Control from "react-leaflet-custom-control"
import PlanSelection from "./plan-selection"

interface Props {
    state: State
}
export default function Settings({ state }: Props) {
    return (
        <Control key="settings" position="topright">
            <div className="flex items-center gap-2">
                <PlanSelection state={state} />
            </div>
        </Control>
    )
}
