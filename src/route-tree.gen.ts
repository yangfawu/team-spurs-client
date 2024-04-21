/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from "@tanstack/react-router"

// Import Routes

import { Route as rootRoute } from "./routes/__root"
import { Route as IndexImport } from "./routes/index"
import { Route as StateLayoutImport } from "./routes/$state/_layout"
import { Route as StateLayoutMinorityDistributionLayoutImport } from "./routes/$state/_layout/minority-distribution/_layout"
import { Route as StateLayoutMinorityDistributionLayoutIndexImport } from "./routes/$state/_layout/minority-distribution/_layout/index"

// Create Virtual Routes

const StateImport = createFileRoute("/$state")()
const StateLayoutMinorityDistributionImport = createFileRoute(
  "/$state/_layout/minority-distribution",
)()
const StateLayoutIndexLazyImport = createFileRoute("/$state/_layout/")()
const StateLayoutHeatIndexLazyImport = createFileRoute(
  "/$state/_layout/heat/",
)()
const StateLayoutGinglesIndexLazyImport = createFileRoute(
  "/$state/_layout/gingles/",
)()
const StateLayoutEiIndexLazyImport = createFileRoute("/$state/_layout/ei/")()
const StateLayoutCompareIndexLazyImport = createFileRoute(
  "/$state/_layout/compare/",
)()
const StateLayoutAssemblyIndexLazyImport = createFileRoute(
  "/$state/_layout/assembly/",
)()
const StateLayoutMinorityDistributionLayoutGroupIndexLazyImport =
  createFileRoute("/$state/_layout/minority-distribution/_layout/$group/")()

// Create/Update Routes

const StateRoute = StateImport.update({
  path: "/$state",
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any)

const StateLayoutRoute = StateLayoutImport.update({
  id: "/_layout",
  getParentRoute: () => StateRoute,
} as any)

const StateLayoutMinorityDistributionRoute =
  StateLayoutMinorityDistributionImport.update({
    path: "/minority-distribution",
    getParentRoute: () => StateLayoutRoute,
  } as any)

const StateLayoutIndexLazyRoute = StateLayoutIndexLazyImport.update({
  path: "/",
  getParentRoute: () => StateLayoutRoute,
} as any).lazy(() =>
  import("./routes/$state/_layout/index.lazy").then((d) => d.Route),
)

const StateLayoutHeatIndexLazyRoute = StateLayoutHeatIndexLazyImport.update({
  path: "/heat/",
  getParentRoute: () => StateLayoutRoute,
} as any).lazy(() =>
  import("./routes/$state/_layout/heat/index.lazy").then((d) => d.Route),
)

const StateLayoutGinglesIndexLazyRoute =
  StateLayoutGinglesIndexLazyImport.update({
    path: "/gingles/",
    getParentRoute: () => StateLayoutRoute,
  } as any).lazy(() =>
    import("./routes/$state/_layout/gingles/index.lazy").then((d) => d.Route),
  )

const StateLayoutEiIndexLazyRoute = StateLayoutEiIndexLazyImport.update({
  path: "/ei/",
  getParentRoute: () => StateLayoutRoute,
} as any).lazy(() =>
  import("./routes/$state/_layout/ei/index.lazy").then((d) => d.Route),
)

const StateLayoutCompareIndexLazyRoute =
  StateLayoutCompareIndexLazyImport.update({
    path: "/compare/",
    getParentRoute: () => StateLayoutRoute,
  } as any).lazy(() =>
    import("./routes/$state/_layout/compare/index.lazy").then((d) => d.Route),
  )

const StateLayoutAssemblyIndexLazyRoute =
  StateLayoutAssemblyIndexLazyImport.update({
    path: "/assembly/",
    getParentRoute: () => StateLayoutRoute,
  } as any).lazy(() =>
    import("./routes/$state/_layout/assembly/index.lazy").then((d) => d.Route),
  )

const StateLayoutMinorityDistributionLayoutRoute =
  StateLayoutMinorityDistributionLayoutImport.update({
    id: "/_layout",
    getParentRoute: () => StateLayoutMinorityDistributionRoute,
  } as any)

const StateLayoutMinorityDistributionLayoutIndexRoute =
  StateLayoutMinorityDistributionLayoutIndexImport.update({
    path: "/",
    getParentRoute: () => StateLayoutMinorityDistributionLayoutRoute,
  } as any)

const StateLayoutMinorityDistributionLayoutGroupIndexLazyRoute =
  StateLayoutMinorityDistributionLayoutGroupIndexLazyImport.update({
    path: "/$group/",
    getParentRoute: () => StateLayoutMinorityDistributionLayoutRoute,
  } as any).lazy(() =>
    import(
      "./routes/$state/_layout/minority-distribution/_layout/$group/index.lazy"
    ).then((d) => d.Route),
  )

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    "/$state": {
      preLoaderRoute: typeof StateImport
      parentRoute: typeof rootRoute
    }
    "/$state/_layout": {
      preLoaderRoute: typeof StateLayoutImport
      parentRoute: typeof StateRoute
    }
    "/$state/_layout/": {
      preLoaderRoute: typeof StateLayoutIndexLazyImport
      parentRoute: typeof StateLayoutImport
    }
    "/$state/_layout/minority-distribution": {
      preLoaderRoute: typeof StateLayoutMinorityDistributionImport
      parentRoute: typeof StateLayoutImport
    }
    "/$state/_layout/minority-distribution/_layout": {
      preLoaderRoute: typeof StateLayoutMinorityDistributionLayoutImport
      parentRoute: typeof StateLayoutMinorityDistributionRoute
    }
    "/$state/_layout/assembly/": {
      preLoaderRoute: typeof StateLayoutAssemblyIndexLazyImport
      parentRoute: typeof StateLayoutImport
    }
    "/$state/_layout/compare/": {
      preLoaderRoute: typeof StateLayoutCompareIndexLazyImport
      parentRoute: typeof StateLayoutImport
    }
    "/$state/_layout/ei/": {
      preLoaderRoute: typeof StateLayoutEiIndexLazyImport
      parentRoute: typeof StateLayoutImport
    }
    "/$state/_layout/gingles/": {
      preLoaderRoute: typeof StateLayoutGinglesIndexLazyImport
      parentRoute: typeof StateLayoutImport
    }
    "/$state/_layout/heat/": {
      preLoaderRoute: typeof StateLayoutHeatIndexLazyImport
      parentRoute: typeof StateLayoutImport
    }
    "/$state/_layout/minority-distribution/_layout/": {
      preLoaderRoute: typeof StateLayoutMinorityDistributionLayoutIndexImport
      parentRoute: typeof StateLayoutMinorityDistributionLayoutImport
    }
    "/$state/_layout/minority-distribution/_layout/$group/": {
      preLoaderRoute: typeof StateLayoutMinorityDistributionLayoutGroupIndexLazyImport
      parentRoute: typeof StateLayoutMinorityDistributionLayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  StateRoute.addChildren([
    StateLayoutRoute.addChildren([
      StateLayoutIndexLazyRoute,
      StateLayoutMinorityDistributionRoute.addChildren([
        StateLayoutMinorityDistributionLayoutRoute.addChildren([
          StateLayoutMinorityDistributionLayoutIndexRoute,
          StateLayoutMinorityDistributionLayoutGroupIndexLazyRoute,
        ]),
      ]),
      StateLayoutAssemblyIndexLazyRoute,
      StateLayoutCompareIndexLazyRoute,
      StateLayoutEiIndexLazyRoute,
      StateLayoutGinglesIndexLazyRoute,
      StateLayoutHeatIndexLazyRoute,
    ]),
  ]),
])

/* prettier-ignore-end */
