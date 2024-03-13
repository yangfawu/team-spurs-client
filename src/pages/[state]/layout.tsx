import { SUPPORTED_STATE_DIRECTORY } from "@/constants/states"
import { Link, Outlet, useParams } from "react-router-dom"

export default function Layout() {
    const { state } = useParams() as { state: string }

    if (state in SUPPORTED_STATE_DIRECTORY) {
        return <Outlet />
    }

    return (
        <div>
            <h3>
                The state code <code>{JSON.stringify(state)}</code> is not
                supported.
            </h3>
            <p>Please return to the home page to select a supported state.</p>
            <p>
                <Link to="/">Go Home</Link>
            </p>
        </div>
    )
}
