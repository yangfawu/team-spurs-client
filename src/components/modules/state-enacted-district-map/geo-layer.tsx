import { AssemblyDistrictGeoFeature, fetchStateAssemblyMap } from "@/api/assembly"
import State from "@/constants/state"
import { useGeoLayerRef } from "@/contexts/geo-layer-ref"
import { useMapFocus } from "@/contexts/map-focus"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { FeatureGroup, GeoJSON, GeoJSONProps, useMap } from "react-leaflet"

interface Props {
    state: State
}
export default function GeoLayer({ state }: Props) {
    const map = useMap()
    const geoRef = useGeoLayerRef()

    const { data } = useSuspenseQuery(fetchStateAssemblyMap(state))

    const context = useMapFocus()

    const onEachFeature: GeoJSONProps["onEachFeature"] = useMemo(() => {
        return ({ properties }: AssemblyDistrictGeoFeature, layer) => {
            const { district: $d } = properties
            layer.bindTooltip(`District ${$d}`, { sticky: true })

            layer.on("click", ({ target }) => {
                map.fitBounds(target.getBounds())
            })
        }
    }, [])

    const getStyle: GeoJSONProps["style"] = useMemo(() => {
        return feature => {
            if (!feature) {
                return { fillColor: Fill.REGULAR }
            }

            const {
                properties: { district: $d },
            } = feature as AssemblyDistrictGeoFeature

            const fillColor = `${state}-${$d}` === context?.focus ? Fill.SELECTED : Fill.REGULAR
            return { fillColor }
        }
    }, [state, context])

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
    SELECTED = "black",
}
