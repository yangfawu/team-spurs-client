import { STATE_TO_NAME } from "@/constants/state"
import useSelectedState from "@/hooks/use-selected-state"
import { Link } from "react-router-dom"

export default function Page() {
    const state = useSelectedState()

    return (
        <div className="flex-1">
            <h3>
                You have selected to get a <b>breakdowns</b> of population distribution, voter behavior, and other
                analysis in <b>{STATE_TO_NAME[state]}</b>
            </h3>
            <p>
                <Link to="/">Reset</Link>
            </p>
        </div>
    )
}
