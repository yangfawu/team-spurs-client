import RegionDemographicBarChart from "@/components/modules/region-demographic-bar-chart"
import { useHeatSettings } from "@/contexts/heat-settings"

export default function RegionBreakdown() {
    const { group } = useHeatSettings()
    return <RegionDemographicBarChart group={group} />
}
