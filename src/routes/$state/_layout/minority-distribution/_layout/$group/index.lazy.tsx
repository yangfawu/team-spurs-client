import Control from "@/components/control"
import { isValidGroup } from "@/constants/group"
import { CurrentGroupProvider } from "@/contexts/current-group"
import { createLazyFileRoute } from "@tanstack/react-router"
import App from "./-app"

function Layout() {
    const group = Route.useParams({ select: p => p.group })

    if (!isValidGroup(group)) {
        throw new Error(`Invalid group: ${group}`)
    }

    return (
        <CurrentGroupProvider value={group}>
            <Control />
            <App />
        </CurrentGroupProvider>
    )
}

export const Route = createLazyFileRoute("/$state/_layout/minority-distribution/_layout/$group/")({
    component: Layout,
})
