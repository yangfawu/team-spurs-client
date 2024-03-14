import { ETHNICITIES } from "@/constants/ethnicities"
import { Navigate, Route } from "react-router-dom"
import GROUP_ROUTER from "./[group]/route"

const MINORITY_DISTRIBUTION_ROUTER = (
    <Route path="minority-distribution">
        <Route index element={<Navigate to={ETHNICITIES[0].key} replace />} />
        {GROUP_ROUTER}
    </Route>
)

export default MINORITY_DISTRIBUTION_ROUTER
