import { Suspense } from "react"
import Chart from "./chart"

export default function StateDemographic() {
    return (
        <div className="flex flex-col p-2 gap-2 w-full h-full overflow-auto">
            <h3 className="text-lg font-bold">State Demographic</h3>
            <Suspense fallback="Loading...">
                <Chart />
            </Suspense>
        </div>
    )
}
