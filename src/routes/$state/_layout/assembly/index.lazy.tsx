import Control from "@/components/control"
import GenericMapAppLoader from "@/components/loader/generic-map-app-loader"
import Mode from "@/constants/mode"
import { CurrentModeProvider } from "@/contexts/current-mode"
import { MapRefProvider } from "@/contexts/map-ref"
import { createLazyFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import App from "./-components/app"

function Page() {
    return (
        <CurrentModeProvider value={Mode.ASSEMBLY}>
            <Control />
            <Suspense fallback={<GenericMapAppLoader />}>
                <MapRefProvider>
                    <App />
                </MapRefProvider>
            </Suspense>
        </CurrentModeProvider>
    )
}

export const Route = createLazyFileRoute("/$state/_layout/assembly/")({
    component: Page,
})
