import useSelectedState from "@/hooks/use-selected-state"
import { useGetCountiesQuery } from "@/redux/counties-api-slice"
import { selectDistrict, showcaseDistrict } from "@/redux/district-plan.slice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useGetRegularDistrictMapQuery } from "@/redux/map.api"
import { FeatureGroup as LeafletFeatureGroup } from "leaflet"
import { RefObject, useMemo } from "react"
import { FeatureGroup, GeoJSON, GeoJSONProps } from "react-leaflet"

interface Props {
    geoRef: RefObject<LeafletFeatureGroup>
}
export default function GeoLayer({ geoRef }: Props) {
    const dispatch = useAppDispatch()
    const chosenDistrict = useAppSelector(selectDistrict)

    const [state_code] = useSelectedState()
    const { currentData, isSuccess } = useGetRegularDistrictMapQuery(state_code)

    const onEachFeature: GeoJSONProps["onEachFeature"] = useMemo(() => {
        return ({ properties: p }, layer) => {
            const { DISTRICT } = p
            layer.bindTooltip(`District ${DISTRICT}`, { sticky: true })
            layer.on("click", ({ target }) => {
                const map = target._map
                if (map) {
                    map.fitBounds(target.getBounds())
                }

                dispatch(showcaseDistrict(Number(DISTRICT) || undefined))
            })
        }
    }, [chosenDistrict])

    const getStyle: GeoJSONProps["style"] = useMemo(() => {
        return feature => {
            if (!feature?.properties) {
                return { fillColor: "#3388ff" }
            }

            const { DISTRICT } = feature?.properties
            if (chosenDistrict === Number(DISTRICT)) {
                return { fillColor: "black" }
            }

            return { fillColor: "#3388ff" }
        }
    }, [chosenDistrict])

    if (!isSuccess || !currentData?.features) return null

    return (
        <FeatureGroup key={state_code} ref={geoRef}>
            {currentData.features.map((feature, i) => (
                <GeoJSON key={i} data={feature} onEachFeature={onEachFeature} style={getStyle} />
            ))}
        </FeatureGroup>
    )
}
