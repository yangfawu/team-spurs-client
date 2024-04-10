import { STATE_TO_NAME } from "@/constants/state"
import useSelectedState from "@/hooks/use-selected-state"
import { Link } from "react-router-dom"

export default function Page() {
    const state = useSelectedState()

    return (
        <div className="flex-1">
            <h3>
                You have selected to <b>compare</b> the currently enacted district plan in <b>{STATE_TO_NAME[state]}</b>{" "}
                with a randomly generated plan.
            </h3>
            <p>
                <Link to="/">Reset</Link>
            </p>
        </div>
    )
}
