import useSelectedState from "@/hooks/use-selected-state"
import { useGetCountiesQuery } from "@/redux/counties-api-slice"
import {
    FeatureGroup as LeafletFeatureGroup,
    LeafletMouseEventHandlerFn,
} from "leaflet"
import { RefObject, useMemo } from "react"
import { FeatureGroup, GeoJSON, GeoJSONProps } from "react-leaflet"

interface Props {
    geoRef: RefObject<LeafletFeatureGroup>
}
export default function GeoLayer({ geoRef }: Props) {
    const [state_code] = useSelectedState()
    const { currentData, isSuccess } = useGetCountiesQuery(state_code)

    const click: LeafletMouseEventHandlerFn = useMemo(() => {
        return ({ target }) => {
            const map = target._map
            if (!map) return

            const districtBounds = target.getBounds()
            map.fitBounds(districtBounds)
        }
    }, [])

    const onEachFeature: GeoJSONProps["onEachFeature"] = useMemo(() => {
        return ({ properties: p }, layer) => {
            const { DISTRICT } = p
            layer.bindTooltip(`District ${DISTRICT}`, { sticky: true })
        }
    }, [])

    if (!isSuccess || !currentData?.features) return null

    return (
        <FeatureGroup key={state_code} ref={geoRef}>
            {currentData.features.map((feature, i) => (
                <GeoJSON
                    key={i}
                    data={feature}
                    onEachFeature={onEachFeature}
                    eventHandlers={{ click }}
                />
            ))}
        </FeatureGroup>
    )
}
