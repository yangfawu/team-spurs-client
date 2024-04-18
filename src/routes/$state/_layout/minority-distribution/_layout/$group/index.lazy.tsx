import Control from "@/components/control"
import { isValidGroup } from "@/constants/group"
import { CurrentGroupProvider } from "@/contexts/current-group"
import { MapRefProvider } from "@/contexts/map-ref"
import { createLazyFileRoute } from "@tanstack/react-router"
import { Suspense, lazy } from "react"

const App = lazy(() => import("./-app"))

function Layout() {
    const group = Route.useParams({ select: p => p.group })

    if (!isValidGroup(group)) {
        throw new Error(`Invalid group: ${group}`)
    }

    return (
        <CurrentGroupProvider value={group}>
            <Control />
            <MapRefProvider>
                <Suspense fallback={<p>Loading...</p>}>
                    <App key={group} />
                </Suspense>
            </MapRefProvider>
        </CurrentGroupProvider>
    )
}

export const Route = createLazyFileRoute("/$state/_layout/minority-distribution/_layout/$group/")({
    component: Layout,
})
