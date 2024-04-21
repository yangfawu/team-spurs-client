import { HeatMapFeature, fetchHeatMap } from "@/api/heat"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useGeoLayerRef } from "@/contexts/geo-layer-ref"
import { featureDemographic, selectGroup, selectLevel } from "@/redux/heat"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { FeatureGroup, GeoJSON, GeoJSONProps, useMap } from "react-leaflet"

export default function GeoLayer() {
    const map = useMap()
    const geoRef = useGeoLayerRef()

    const state = useSafeCurrentState()
    const level = useAppSelector(selectLevel)
    const group = useAppSelector(selectGroup)
    const {
        data: { features, legend },
    } = useSuspenseQuery(fetchHeatMap(state, level, group))

    const dispatch = useAppDispatch()
    const onEachFeature: GeoJSONProps["onEachFeature"] = useMemo(() => {
        return ({ id, title, demographic }: HeatMapFeature, layer) => {
            const name = title || id
            layer.bindTooltip(name, { sticky: true })

            layer.on("click", ({ target }) => {
                map.fitBounds(target.getBounds())
                dispatch(
                    featureDemographic({
                        title: name,
                        breakdown: demographic,
                    }),
                )
            })
        }
    }, [])

    const getStyle: GeoJSONProps["style"] = useMemo(() => {
        const { bins } = legend
        const fillOpacity = 0.7
        return feature => {
            if (!feature) {
                return { fillOpacity, fillColor: Fill.REGULAR }
            }

            const {
                bins: { [group]: id },
            } = feature as HeatMapFeature
            const fillColor = bins[id].color
            return { fillOpacity, fillColor }
        }
    }, [legend, group])

    return (
        <FeatureGroup ref={geoRef}>
            {features.map(feature => (
                <GeoJSON key={feature.id} data={feature} onEachFeature={onEachFeature} style={getStyle} />
            ))}
        </FeatureGroup>
    )
}

enum Fill {
    REGULAR = "#3388ff",
    // SELECTED = "black",
}
