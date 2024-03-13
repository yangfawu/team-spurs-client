import { lazy } from "react"
import { Route } from "react-router-dom"

const Page = lazy(() => import("./page"))

// this route has no sub-routes, so no children
const SLUG_ROUTER = <Route path=":pid" element={<Page />} />

export default SLUG_ROUTER
