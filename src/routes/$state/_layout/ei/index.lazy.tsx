import Navbar from "@/components/navbar"
import Mode from "@/constants/mode"
import { CurrentModeProvider } from "@/contexts/current-mode"
import { createLazyFileRoute } from "@tanstack/react-router"

function Layout() {
    return (
        <CurrentModeProvider value={Mode.ECOLOGICAL_INFERENCE}>
            <Navbar />
            <p>TBA</p>
        </CurrentModeProvider>
    )
}

export const Route = createLazyFileRoute("/$state/_layout/ei/")({
    component: Layout,
})
