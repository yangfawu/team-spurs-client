import { useSafeCurrentGroup } from "@/contexts/current-group"
import { useSafeCurrentState } from "@/contexts/current-state"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchHeatMap } from "@/redux/map.api"
import { HeatDistrictGeoFeature } from "@/api/map"
import { selectDistrict, showcaseDistrict } from "@/redux/showcase.slice"
import { generateGradientFunction } from "@/util/gradient"
import { FeatureGroup as LeafletFeatureGroup, Map } from "leaflet"
import { RefObject, useMemo } from "react"
import { FeatureGroup, GeoJSON, GeoJSONProps } from "react-leaflet"

interface Props {
    geoRef: RefObject<LeafletFeatureGroup>
}
export default function GeoLayer({ geoRef }: Props) {
    const dispatch = useAppDispatch()

    const state = useSafeCurrentState()
    const group = useSafeCurrentGroup()
    const { currentData, isSuccess } = fetchHeatMap({
        group,
        state,
    })

    const district = useAppSelector(selectDistrict)

    const onEachFeature: GeoJSONProps["onEachFeature"] = useMemo(() => {
        return ({ properties }: HeatDistrictGeoFeature, layer) => {
            const { district: $d } = properties
            layer.bindTooltip(`District ${$d}`, { sticky: true })

            layer.on("click", ({ target }) => {
                // make the map zoom to it
                const map = target._map as Map
                if (map) {
                    map.fitBounds(target.getBounds())
                }

                // notify the store that this district will be showcased
                dispatch(showcaseDistrict($d))
            })
        }
    }, [district])

    const getStyle: GeoJSONProps["style"] = useMemo(() => {
        return feature => {
            if (!feature) {
                return { fillColor: Fill.REGULAR, fillOpacity: 0.7 }
            }

            const {
                properties: { district: $d, heat_value },
            } = feature as HeatDistrictGeoFeature
            if ($d === district) {
                return { fillColor: Fill.SELECTED, fillOpacity: 0.7 }
            }

            return {
                fillColor: computeColor(heat_value),
                fillOpacity: 1,
            }
        }
    }, [district])

    if (!isSuccess || !currentData) return null

    return (
        <FeatureGroup key={state} ref={geoRef}>
            {currentData.map((feature, i) => (
                <GeoJSON key={i} data={feature} onEachFeature={onEachFeature} style={getStyle} />
            ))}
        </FeatureGroup>
    )
}

enum Fill {
    REGULAR = "white",
    SELECTED = "black",
}

const computeColor = generateGradientFunction([255, 255, 255], [255, 0, 0])
