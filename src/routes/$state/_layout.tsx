import { isValidState } from "@/constants/state"
import { CurrentStateProvider } from "@/contexts/current-state.context"
import { Outlet, createFileRoute } from "@tanstack/react-router"

function Layout() {
    const state = Route.useParams({ select: p => p.state })

    if (!isValidState(state)) {
        throw new Error(`Invalid state: ${state}`)
    }

    return (
        <CurrentStateProvider value={state}>
            <Outlet />
        </CurrentStateProvider>
    )
}

export const Route = createFileRoute("/$state/_layout")({
    component: Layout,
})
