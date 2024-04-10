import { STATE_TO_NAME } from "@/constants/state"
import useSelectedState from "@/hooks/use-selected-state"
import { Link, Outlet } from "react-router-dom"

export default function Layout() {
    // NOTE: at this point, the state may not be valid, but TS doesn't know that
    const state = useSelectedState()

    // if there is a mapping, then this is a valid state
    if (state in STATE_TO_NAME) {
        return <Outlet />
    }

    return (
        <div>
            <h3>
                The state code <code>{JSON.stringify(state)}</code> is not supported.
            </h3>
            <p>Please return to the home page to select a supported state.</p>
            <p>
                <Link to="/">Go Home</Link>
            </p>
        </div>
    )
}
