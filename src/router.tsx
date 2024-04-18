import { createRouter } from "@tanstack/react-router"

// Import the generated route tree
import { routeTree } from "./route-tree.gen"

// Create a new router instance
const router = createRouter({ routeTree, notFoundMode: "fuzzy" })

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

export default router
