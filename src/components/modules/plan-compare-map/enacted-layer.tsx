import { AssemblyDistrictGeoFeature, fetchStateAssemblyMap } from "@/api/summary"
import State from "@/constants/state"
import { useGeoLayerRef } from "@/contexts/geo-layer-ref"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { FeatureGroup, GeoJSON, GeoJSONProps } from "react-leaflet"

interface Props {
    state: State
}
export default function EnactedLayer({ state }: Props) {
    const geoRef = useGeoLayerRef()

    const { data } = useSuspenseQuery(fetchStateAssemblyMap(state))

    const onEachFeature: GeoJSONProps["onEachFeature"] = useMemo(() => {
        return ({ properties }: AssemblyDistrictGeoFeature, layer) => {
            const { district: $d } = properties
            layer.bindTooltip(`Enacted District ${$d}`, { sticky: true })
        }
    }, [])

    const getStyle: GeoJSONProps["style"] = useMemo(() => {
        return () => ({
            fillOpacity: 0,
            color: Fill.REGULAR,
            weight: 1.5, 
        })
    }, [])

    return (
        <FeatureGroup ref={geoRef}>
            {data.map(feature => (
                <GeoJSON key={feature.id} data={feature} onEachFeature={onEachFeature} style={getStyle} />
            ))}
        </FeatureGroup>
    )
}

enum Fill {
    REGULAR = "#3388ff",
    // SELECTED = "black",
}
