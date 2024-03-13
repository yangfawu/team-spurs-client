import { lazy } from "react"
import { Route } from "react-router-dom"

const Page = lazy(() => import("./page"))

// this route has no sub-routes, so no children
const ABOUT_ROUTER = <Route path="about" element={<Page />} />

export default ABOUT_ROUTER
