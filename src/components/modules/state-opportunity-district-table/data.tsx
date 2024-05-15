import { OpportunityDistrictStat } from "@/api/summary"
import { GROUP_TO_NAME } from "@/constants/group"
import { createColumnHelper } from "@tanstack/react-table"

const ch = createColumnHelper<OpportunityDistrictStat>()
export const COLUMNS = [
    ch.accessor("group", {
        header: () => "Group",
        cell: c => GROUP_TO_NAME[c.getValue()],
    }),
    ch.accessor("ideal_population", {
        header: () => "Ideal Population",
        cell: c => c.getValue().toLocaleString(),
    }),
    ch.accessor("actual_population", {
        header: () => "Current Population",
        cell: c => c.getValue().toLocaleString(),
    }),
    ch.accessor("actual_opp_districts", {
        header: () => "(Actual) Opportunity Districts",
        cell: c => c.getValue().length.toLocaleString(),
    }),
    ch.accessor("max_opp_districts", {
        header: () => "Max Opportunity Districts",
        cell: c => c.getValue().toLocaleString(),
    }),
    ch.accessor("avg_opp_districts", {
        header: () => "Average Opportunity Districts (Ensemble)",
        cell: c => c.getValue().toLocaleString(),
    }),
]
