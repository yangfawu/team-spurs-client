import { AssemblyDistrictGeoFeature, fetchStateAssemblyMap } from "@/api/map"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useGeoLayerRef } from "@/contexts/geo-layer-ref"
import { selectDistrict } from "@/redux/assembly"
import { useAppSelector } from "@/redux/hooks"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { FeatureGroup, GeoJSON, GeoJSONProps, useMap } from "react-leaflet"

export default function GeoLayer() {
    const map = useMap()
    const geoRef = useGeoLayerRef()

    const state = useSafeCurrentState()
    const { data } = useSuspenseQuery(fetchStateAssemblyMap(state))

    const district = useAppSelector(selectDistrict)

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
            const isSelected = state === district?.state && $d === district?.id
            const fillColor = isSelected ? Fill.SELECTED : Fill.REGULAR
            return { fillColor }
        }
    }, [state, district])

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
