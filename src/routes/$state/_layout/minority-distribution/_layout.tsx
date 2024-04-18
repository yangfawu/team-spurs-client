import Mode from "@/constants/mode"
import { CurrentModeProvider } from "@/contexts/current-mode"
import { Outlet, createFileRoute } from "@tanstack/react-router"

function Layout() {
    return (
        <CurrentModeProvider value={Mode.MINORITY_DISTRIBUTION}>
            <Outlet />
        </CurrentModeProvider>
    )
}

export const Route = createFileRoute("/$state/_layout/minority-distribution/_layout")({
    component: Layout,
})
