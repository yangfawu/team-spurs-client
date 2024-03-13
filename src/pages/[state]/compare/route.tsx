import { lazy } from "react"
import { Route } from "react-router-dom"

const Page = lazy(() => import("./page"))

const COMPARE_ROUTER = <Route path="compare" Component={Page} />

export default COMPARE_ROUTER
