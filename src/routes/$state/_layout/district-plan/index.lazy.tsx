import Control from "@/components/control"
import Mode from "@/constants/mode"
import { CurrentModeProvider } from "@/contexts/current-mode"
import { MapRefProvider } from "@/contexts/map-ref"
import { createLazyFileRoute } from "@tanstack/react-router"
import { Suspense, lazy } from "react"

const App = lazy(() => import("./-app"))

function Layout() {
    return (
        <CurrentModeProvider value={Mode.DISTRICT_PLAN}>
            <Control />
            <MapRefProvider>
                <Suspense fallback={<p>Loading...</p>}>
                    <App />
                </Suspense>
            </MapRefProvider>
        </CurrentModeProvider>
    )
}

export const Route = createLazyFileRoute("/$state/_layout/district-plan/")({
    component: Layout,
})
