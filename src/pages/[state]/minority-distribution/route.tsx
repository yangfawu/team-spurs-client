import Group from "@/constants/group"
import Mode from "@/constants/mode"
import { Navigate, Route } from "react-router-dom"
import GROUP_ROUTER from "./[group]/route"

const MINORITY_DISTRIBUTION_ROUTER = (
    <Route path={Mode.MINORITY_DISTRIBUTION}>
        <Route index element={<Navigate to={Group.WHITE} replace />} />
        {GROUP_ROUTER}
    </Route>
)

export default MINORITY_DISTRIBUTION_ROUTER
