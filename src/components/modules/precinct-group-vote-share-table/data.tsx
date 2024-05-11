import { PrecinctPoint } from "@/api/precinct"
import { createColumnHelper } from "@tanstack/react-table"

const ch = createColumnHelper<PrecinctPoint>()
export const COLUMNS = [
    ch.accessor("name", {
        header: () => "Precinct",
        cell: c => c.getValue(),
    }),
    ch.accessor("total_population", {
        header: () => "Total Population",
        cell: c => c.getValue().toLocaleString(),
    }),
    ch.accessor("group_population", {
        header: () => "Minority Population",
        cell: c => c.getValue().toLocaleString(),
    }),
    ch.accessor("percent_democrat", {
        header: () => "% Democrat Votes",
        cell: c => (c.getValue() * 100).toFixed(1),
    }),
    ch.accessor("percent_republican", {
        header: () => "% Republican Votes",
        cell: c => (c.getValue() * 100).toFixed(1),
    }),
]
