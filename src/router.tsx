import queryClient from "@/api/client"
import BigSpinner from "@/components/big-spinner"
import { ErrorComponent, createRouter } from "@tanstack/react-router"

// Import the generated route tree
import { routeTree } from "./route-tree.gen"

// Create a new router instance
const router = createRouter({
    routeTree,
    defaultPendingComponent: BigSpinner,
    defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
    context: {
        queryClient,
    },
    defaultPreload: "intent",
    // Ensure the loader is always called when the route is preloaded or visited ti avoid stale loader calls
    defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

export default router
