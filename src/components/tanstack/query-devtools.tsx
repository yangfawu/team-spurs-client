import { lazy } from "react"

const QueryDevtools =
    import.meta.env.VITE_ENABLE_TANSTACK_DEVTOOLS === "false"
        ? () => null
        : lazy(() =>
              import("@tanstack/react-query-devtools").then(res => ({
                  default: res.ReactQueryDevtools,
              })),
          )

export default QueryDevtools
