import { SeawulfMapFeature, fetchSeawulfPlan } from "@/api/compare"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { FeatureGroup, GeoJSON, GeoJSONProps } from "react-leaflet"

interface Props {
    plan: string
}
export default function Layer({ plan }: Props) {
    const { data } = useSuspenseQuery(fetchSeawulfPlan(plan))

    const onEachFeature: GeoJSONProps["onEachFeature"] = useMemo(() => {
        return ({ properties }: SeawulfMapFeature, layer) => {
            const { district: $d } = properties
            layer.bindTooltip(`Seawulf District ${$d}`, { sticky: true })
        }
    }, [])

    const getStyle: GeoJSONProps["style"] = useMemo(() => {
        return () => ({
            fillColor: Fill.REGULAR,
            color: Fill.REGULAR,
        })
    }, [])

    return (
        <FeatureGroup>
            {data.map(feature => (
                <GeoJSON key={feature.id} data={feature} onEachFeature={onEachFeature} style={getStyle} />
            ))}
        </FeatureGroup>
    )
}

enum Fill {
    REGULAR = "#d81919",
    // SELECTED = "black",
}
