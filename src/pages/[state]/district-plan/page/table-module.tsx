import data from "@/assets/fake-reps.json"
import { getTheme } from "@table-library/react-table-library/baseline"
import { CompactTable } from "@table-library/react-table-library/compact"
import { Row } from "@table-library/react-table-library/table"
import { useTheme } from "@table-library/react-table-library/theme"
import { CompactTableProps } from "@table-library/react-table-library/types/compact"

type Row = (typeof data)[number]

const COLUMNS: CompactTableProps<Row>["columns"] = [
    {
        label: "District ID",
        renderCell: item => item.id,
    },
    {
        label: "First Name",
        renderCell: item => item.first_name,
    },
    {
        label: "Last Name",
        renderCell: item => item.last_name,
    },
    {
        label: "Party",
        renderCell: item => {
            switch (item.party) {
                case "I":
                    return "Independent"
                case "R":
                    return "Republican"
                case "D":
                    return "Democrat"
                default:
                    return "Unknown"
            }
        },
    },
    {
        label: "Race(s)",
        renderCell: item => {
            return (
                [item.race, item.race2].filter(e => e !== null).join(", ") ||
                "Unknown"
            )
        },
    },
]

export default function TableModule() {
    const theme = useTheme(getTheme())

    return (
        <CompactTable
            columns={COLUMNS}
            data={{ nodes: data }}
            theme={theme}
            layout={{ fixedHeader: true }}
        />
    )
}
