import NamedLogo from "../attribution/named-logo"
import GroupSelection from "./group-selection"
import ModeSelection from "./mode-selection"
import StateSelection from "./state-selection"

export default function Control() {
    return (
        <div className="flex divide-black divide-x-2">
            <NamedLogo />
            <StateSelection />
            <ModeSelection />
            <GroupSelection />
        </div>
    )
}
