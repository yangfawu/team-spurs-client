import Control from "@/components/control"
import Mode from "@/constants/mode"
import { CurrentModeProvider } from "@/contexts/current-mode"
import { createLazyFileRoute } from "@tanstack/react-router"
import App from "./-app"

function Layout() {
    return (
        <CurrentModeProvider value={Mode.DISTRICT_PLAN}>
            <Control />
            <App />
        </CurrentModeProvider>
    )
}

export const Route = createLazyFileRoute("/$state/_layout/district-plan/")({
    component: Layout,
})
