import NamedLogo from "@/components/attribution/named-logo"
import GroupSelection from "@/components/control/group-selection"
import ModeSelection from "@/components/control/mode-selection"
import StateSelection from "@/components/control/state-selection"
import { SUPPORTED_ETHNICITY_DIRECTORY, SupportedEthnicityKey } from "@/constants/ethnicities"
import useSelectedState from "@/hooks/use-selected-state"
import { Link, Outlet, useParams } from "react-router-dom"

export default function Layout() {
    const [state_code] = useSelectedState()
    const { group } = useParams() as { group: string }

    if (group in SUPPORTED_ETHNICITY_DIRECTORY) {
        const $group = group as SupportedEthnicityKey
        return (
            <div className="h-full flex flex-col divide-black divide-y-2">
                <div className="flex divide-black divide-x-2">
                    <NamedLogo />
                    <StateSelection value={state_code} getPath={v => `/${v}/minority-distribution/${$group}`} />
                    <ModeSelection
                        value="minority-distribution"
                        getPath={v =>
                            v === "minority-distribution"
                                ? `/${state_code}/minority-distribution/${$group}`
                                : `/${state_code}/${v}`
                        }
                    />
                    <GroupSelection value={$group} getPath={v => `/${state_code}/minority-distribution/${v}`} />
                </div>
                <Outlet />
            </div>
        )
    }

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
