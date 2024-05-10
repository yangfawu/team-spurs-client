import BarChartLoader from "@/components/loader/bar-chart-loader"
import Group from "@/constants/group"
import { useRegionDemographicShowcase } from "@/contexts/region-demographic-showcase"
import { Suspense, useCallback, useMemo } from "react"
import tw from "tailwind-styled-components"
import Chart from "./chart"

interface Props {
    group: Group
}
export default function RegionDemographicBarChart({ group }: Props) {
    const context = useRegionDemographicShowcase()

    const title = useMemo(() => context?.modal?.title, [context])

    const clearModal = useCallback(() => context?.setModal(null), [context])

    return (
        <Container>
            <h3 className="text-lg font-bold">Demographic Breakdown</h3>
            {title && (
                <h5 className="uppercase font-semibold text-sm">
                    {title} (
                    <span className="cursor-pointer text-blue-400 hover:text-blue-800" onClick={clearModal}>
                        clear
                    </span>
                    )
                </h5>
            )}
            <Suspense fallback={<BarChartLoader />}>
                {context?.modal ? (
                    <Chart group={group} />
                ) : (
                    <div className="flex items-center justify-center p-2">
                        <em className="text-center">No data available</em>
                    </div>
                )}
            </Suspense>
        </Container>
    )
}

const Container = tw.div`
    h-full
    p-2
    flex flex-col items-stretch gap-2
`
