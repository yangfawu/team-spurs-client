import { lazy } from "react"

const MyTanStackRouterDevtools =
    import.meta.env.VITE_ENABLE_TANSTACK_ROUTER_DEVTOOLS === "false"
        ? () => null
        : lazy(() =>
              import("@tanstack/router-devtools").then(res => ({
                  default: res.TanStackRouterDevtools,
              })),
          )

export default MyTanStackRouterDevtools
