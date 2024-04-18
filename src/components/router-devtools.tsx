import { lazy } from "react"

const RouterDevtools =
    import.meta.env.VITE_ENABLE_TANSTACK_DEVTOOLS === "false"
        ? () => null
        : lazy(() =>
              import("@tanstack/router-devtools").then(res => ({
                  default: res.TanStackRouterDevtools,
              })),
          )

export default RouterDevtools
