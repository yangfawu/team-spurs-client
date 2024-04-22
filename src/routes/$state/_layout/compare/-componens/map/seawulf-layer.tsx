import { AssemblyDistrictGeoFeature, fetchStateAssemblyMap } from "@/api/map"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { FeatureGroup, GeoJSON, GeoJSONProps } from "react-leaflet"

export default function SeawulfLayer() {
    const state = useSafeCurrentState()
    const { data } = useSuspenseQuery(fetchStateAssemblyMap(state))

    const onEachFeature: GeoJSONProps["onEachFeature"] = useMemo(() => {
        return ({ properties }: AssemblyDistrictGeoFeature, layer) => {
            const { district: $d } = properties
            layer.bindTooltip(`District ${$d}`, { sticky: true })
        }
    }, [])

    const getStyle: GeoJSONProps["style"] = useMemo(() => {
        return () => ({ fillColor: Fill.REGULAR })
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
