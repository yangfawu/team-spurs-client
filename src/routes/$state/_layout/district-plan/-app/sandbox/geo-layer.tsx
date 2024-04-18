import { useSafeCurrentState } from "@/contexts/current-state"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { fetchRegularDistrictMap } from "@/redux/map.api"
import { AssemblyDistrictGeoFeature } from "@/api/map"
import { selectDistrict, showcaseDistrict } from "@/redux/showcase.slice"
import { FeatureGroup as LeafletFeatureGroup, Map } from "leaflet"
import { RefObject, useMemo } from "react"
import { FeatureGroup, GeoJSON, GeoJSONProps } from "react-leaflet"

interface Props {
    geoRef: RefObject<LeafletFeatureGroup>
}
export default function GeoLayer({ geoRef }: Props) {
    const dispatch = useAppDispatch()

    const state = useSafeCurrentState()
    const { currentData, isSuccess } = fetchRegularDistrictMap(state)

    const district = useAppSelector(selectDistrict)

    const onEachFeature: GeoJSONProps["onEachFeature"] = useMemo(() => {
        return ({ properties }: AssemblyDistrictGeoFeature, layer) => {
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
                return { fillColor: Fill.REGULAR }
            }

            const {
                properties: { district: $d },
            } = feature as AssemblyDistrictGeoFeature
            const fillColor = district === $d ? Fill.SELECTED : Fill.REGULAR
            return { fillColor }
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
    REGULAR = "#3388ff",
    SELECTED = "black",
}
