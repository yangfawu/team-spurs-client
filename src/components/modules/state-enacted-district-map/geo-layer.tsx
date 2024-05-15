import { AssemblyDistrictGeoFeature, fetchStateAssemblyMap } from "@/api/summary"
import State from "@/constants/state"
import { useDistrictShowcase } from "@/contexts/district-showcase"
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

    const onEachFeature: GeoJSONProps["onEachFeature"] = useMemo(() => {
        return ({ properties }: AssemblyDistrictGeoFeature, layer) => {
            const { district: $d } = properties
            layer.bindTooltip(`District ${$d}`, { sticky: true })

            layer.on("click", ({ target }) => {
                map.fitBounds(target.getBounds())
            })
        }
    }, [])

    const opContext = useDistrictShowcase()
    const focusContext = useMapFocus()
    const getStyle: GeoJSONProps["style"] = useMemo(() => {
        const defaultStyle = { fillOpacity: 0, weight: 0.9 }

        return feature => {
            if (!feature) return defaultStyle

            const {
                properties: { district: $d },
            } = feature as AssemblyDistrictGeoFeature

            const id = `${state}-${$d}`
            if (id === focusContext?.focus) {
                return { ...defaultStyle, fillOpacity: 0.5, fillColor: Fill.SELECTED }
            }

            if (opContext.districts.includes(id)) {
                return { ...defaultStyle, fillOpacity: 0.8, fillColor: Fill.REGULAR }
            }

            return defaultStyle
        }
    }, [state, focusContext, opContext])

    return (
        <FeatureGroup ref={geoRef}>
            {data.map(feature => (
                <GeoJSON key={feature.id} data={feature} onEachFeature={onEachFeature} style={getStyle} />
            ))}
        </FeatureGroup>
    )
}

enum Fill {
    REGULAR = "red",
    SELECTED = "black",
}
