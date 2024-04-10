import NamedLogo from "@/components/attribution/named-logo"
import GroupSelection from "@/components/control/group-selection"
import ModeSelection from "@/components/control/mode-selection"
import StateSelection from "@/components/control/state-selection"
import { GROUP_TO_NAME } from "@/constants/group"
import Mode from "@/constants/mode"
import useSelectedGroup from "@/hooks/use-selected-group"
import useSelectedState from "@/hooks/use-selected-state"
import { Link, Outlet } from "react-router-dom"

export default function Layout() {
    const state = useSelectedState()

    // NOTE: group may not be valid, but TS doesn't know
    const group = useSelectedGroup()

    // if there is no mapping, then it is not a valid group
    if (!(group in GROUP_TO_NAME)) {
        return (
            <div>
                <h3>
                    The minority code <code>{JSON.stringify(group)}</code> is not supported.
                </h3>
                <p>Please return to the home page to select a supported group.</p>
                <p>
                    <Link to="/">Go Home</Link>
                </p>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col divide-black divide-y-2">
            <div className="flex divide-black divide-x-2">
                <NamedLogo />
                <StateSelection state={state} getPath={v => buildMDPath(v, group)} />
                <ModeSelection
                    mode={Mode.MINORITY_DISTRIBUTION}
                    getPath={v => (v === Mode.MINORITY_DISTRIBUTION ? buildMDPath(state, group) : `/${state}/${v}`)}
                />
                <GroupSelection group={group} getPath={v => buildMDPath(state, v)} />
            </div>
            <Outlet />
        </div>
    )
}

const buildPath = (state: string, group: string, mode: Mode) => `/${state}/${mode}/${group}`

const buildMDPath = (state: string, group: string) => buildPath(state, group, Mode.MINORITY_DISTRIBUTION)
