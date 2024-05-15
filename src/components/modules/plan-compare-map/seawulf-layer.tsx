import { SeawulfFeature, fetchSeawulfPlan } from "@/api/plan"
import State from "@/constants/state"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { FeatureGroup, GeoJSON, GeoJSONProps } from "react-leaflet"

interface Props {
    state: State
    plan: number
}
export default function SeawulfLayer({ state, plan }: Props) {
    const { data } = useSuspenseQuery(fetchSeawulfPlan(state, plan))

    const onEachFeature: GeoJSONProps["onEachFeature"] = useMemo(() => {
        return ({ properties }: SeawulfFeature, layer) => {
            const { district: $d } = properties
            layer.bindTooltip(`Seawulf District ${$d}`, { sticky: true })
        }
    }, [])

    const getStyle: GeoJSONProps["style"] = useMemo(() => {
        return () => ({
            fillColor: Fill.REGULAR,
            color: Fill.REGULAR,
            weight: 1.5, 
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
