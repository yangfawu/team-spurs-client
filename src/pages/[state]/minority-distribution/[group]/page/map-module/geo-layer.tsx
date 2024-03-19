import useSelectedMinority from "@/hooks/use-selected-minority"
import useSelectedState from "@/hooks/use-selected-state"
import { selectDistrict, showcaseDistrict } from "@/redux/district-plan.slice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useGetHeatDistrictMapQuery } from "@/redux/map.api"
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
    const group = useSelectedMinority()
    const { currentData, isSuccess } = useGetHeatDistrictMapQuery({
        group,
        state: state_code,
    })

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
        if (!currentData) {
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
        }
        
        const { key, min, max, table } = currentData
        return feature => {
            if (!feature?.properties) {
                return { fillColor: "#3388ff", fillOpacity: 0.5 }
            }

            const { DISTRICT } = feature?.properties
            const district = Number(DISTRICT)
            if (chosenDistrict === district) {
                return { fillColor: "black", fillOpacity: 0.5 }
            }

            const count = table[district][key] || table[district][group]
            console.log(count)

            const num = count - min
            const den = max - min
            const frac = num / den
            const grade = 255 - Math.floor(frac * (255 - 50)) + 50
            return { 
                fillColor: `rgb(222, ${grade}, ${grade})`, 
                fillOpacity: 1
            }
        }
    }, [currentData, chosenDistrict])

    if (!isSuccess || !currentData?.map?.features) return null

    return (
        <FeatureGroup key={state_code} ref={geoRef}>
            {currentData.map.features.map((feature, i) => (
                <GeoJSON key={i} data={feature} onEachFeature={onEachFeature} style={getStyle} />
            ))}
        </FeatureGroup>
    )
}
