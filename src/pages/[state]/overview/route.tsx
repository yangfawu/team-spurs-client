import { lazy } from "react"
import { Route } from "react-router-dom"

const Page = lazy(() => import("./page"))

const OVERVIEW_ROUTER = <Route path="overview" Component={Page} />

export default OVERVIEW_ROUTER
