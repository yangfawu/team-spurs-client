import NamedLogo from "@/components/attribution/named-logo"
import ModeSelection from "@/components/control/mode-selection"
import StateSelection from "@/components/control/state-selection"
import Mode from "@/constants/mode"
import useSelectedState from "@/hooks/use-selected-state"
import { Outlet } from "react-router-dom"

export default function Layout() {
    const state = useSelectedState()

    return (
        <div className="h-full flex flex-col divide-black divide-y-2">
            <div className="flex divide-black divide-x-2">
                <NamedLogo />
                <StateSelection state={state} getPath={v => `/${v}/${Mode.OVERVIEW}`} />
                <ModeSelection mode={Mode.OVERVIEW} getPath={v => `/${state}/${v}`} />
            </div>
            <Outlet />
        </div>
    )
}
