import { lazy } from "react"
import { Route } from "react-router-dom"

const Page = lazy(() => import("./page"))

const DISTRICT_PLAN_ROUTER = <Route path="district-plan" Component={Page} />

export default DISTRICT_PLAN_ROUTER
