import { AssemblyDistrictGeoFeature, fetchStateAssemblyMap } from "@/api/map"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useGeoLayerRef } from "@/contexts/geo-layer-ref"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { selectDistrict, showcaseDistrict } from "@/redux/showcase"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { FeatureGroup, GeoJSON, GeoJSONProps, useMap } from "react-leaflet"

export default function GeoLayer() {
    const map = useMap()
    const geoRef = useGeoLayerRef()

    const state = useSafeCurrentState()
    const { data } = useSuspenseQuery(fetchStateAssemblyMap(state))

    const dispatch = useAppDispatch()
    const district = useAppSelector(selectDistrict)

    const onEachFeature: GeoJSONProps["onEachFeature"] = useMemo(() => {
        return ({ properties }: AssemblyDistrictGeoFeature, layer) => {
            const { district: $d } = properties
            layer.bindTooltip(`District ${$d}`, { sticky: true })

            layer.on("click", ({ target }) => {
                // Make the map zoom to it
                map.fitBounds(target.getBounds())

                // Notify the store that this district will be showcased
                dispatch(showcaseDistrict($d))
            })
        }
    }, [district])

    const getStyle: GeoJSONProps["style"] = useMemo(() => {
        return feature => {
            if (!feature) {
                return { fillColor: Fill.REGULAR }
            }

            const {
                properties: { district: $d },
            } = feature as AssemblyDistrictGeoFeature
            const fillColor = district === $d ? Fill.SELECTED : Fill.REGULAR
            return { fillColor }
        }
    }, [district])

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
