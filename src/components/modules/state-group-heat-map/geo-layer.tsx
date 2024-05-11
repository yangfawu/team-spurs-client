import { HeatMapFeature, fetchHeatMap } from "@/api/heat"
import State from "@/constants/state"
import { useGeoLayerRef } from "@/contexts/geo-layer-ref"
import { useRegionDemographicShowcase } from "@/contexts/region-demographic-showcase"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { FeatureGroup, GeoJSON, GeoJSONProps, useMap } from "react-leaflet"
import { useHeatSettings } from "@/contexts/heat-settings"

interface Props {
    state: State
}
export default function GeoLayer({ state }: Props) {
    const map = useMap()
    const geoRef = useGeoLayerRef()

    const { group, level } = useHeatSettings()
    const {
        data: { features, legend },
    } = useSuspenseQuery(fetchHeatMap(state, level, group))

    const context = useRegionDemographicShowcase()

    const onEachFeature: GeoJSONProps["onEachFeature"] = useMemo(() => {
        return ({ id, title, demographic }: HeatMapFeature, layer) => {
            const name = title || id
            layer.bindTooltip(name, { sticky: true })

            layer.on("click", ({ target }) => {
                map.fitBounds(target.getBounds())
                context?.setModal({
                    id,
                    title: name,
                    breakdown: demographic,
                })
            })
        }
    }, [context])

    const getStyle: GeoJSONProps["style"] = useMemo(() => {
        const { bins } = legend
        const fillOpacity = 0.5
        const color = bins[bins.length >> 1].color

        return feature => {
            if (!feature) {
                return { fillOpacity, fillColor: Fill.REGULAR }
            }

            const {
                id,
                bins: { [group]: bin_index },
            } = feature as HeatMapFeature
            const fillColor = bins[bin_index].color

            if (context.modal?.id === id) {
                return { fillColor: "black", fillOpacity: 0.5, weight: 1 }
            }

            return { fillOpacity, fillColor, color, weight: 0.5 }
        }
    }, [legend, group, context])

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
