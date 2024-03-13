import NamedLogo from "@/components/attribution/named-logo"
import ModeSelection from "@/components/control/mode-selection"
import StateSelection from "@/components/control/state-selection"
import useSelectedState from "@/hooks/use-selected-state"
import { Outlet } from "react-router-dom"

export default function Layout() {
    const [state_code] = useSelectedState()

    return (
        <div className="h-full flex flex-col divide-black divide-y-2">
            <div className="flex divide-black divide-x-2">
                <NamedLogo />
                <StateSelection value={state_code} />
                <ModeSelection value="md"/>
            </div>
            <Outlet />
        </div>
    )
}
