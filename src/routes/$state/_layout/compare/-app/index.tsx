import { STATE_TO_NAME } from "@/constants/state"
import { useSafeCurrentState } from "@/contexts/current-state.context"
import { Link } from "@tanstack/react-router"

export default function App() {
    const state = useSafeCurrentState()

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
