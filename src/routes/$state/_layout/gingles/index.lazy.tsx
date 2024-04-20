import Control from "@/components/control"
import Mode from "@/constants/mode"
import { CurrentModeProvider } from "@/contexts/current-mode"
import { createLazyFileRoute } from "@tanstack/react-router"

function Layout() {
    return (
        <CurrentModeProvider value={Mode.GINGLES}>
            <Control />
            <p>TBA</p>
        </CurrentModeProvider>
    )
}

export const Route = createLazyFileRoute("/$state/_layout/gingles/")({
    component: Layout,
})