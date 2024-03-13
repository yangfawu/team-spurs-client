import { lazy } from "react"
import { Route } from "react-router-dom"

const Page = lazy(() => import("./page"))

const MINORITY_DISTRIBUTION_ROUTER = <Route path="minority-distribution" Component={Page} />

export default MINORITY_DISTRIBUTION_ROUTER
