import useSelectedState from "@/hooks/use-selected-state"
import { useGetCountiesQuery } from "@/redux/counties-api-slice"
import { LeafletMouseEventHandlerFn } from "leaflet"
import { GeoJSON, GeoJSONProps, LayerGroup } from "react-leaflet"

export default function GeoLayer() {
    const [state_code] = useSelectedState()
    const { currentData, isSuccess } = useGetCountiesQuery(state_code)

    if (!isSuccess || !currentData?.features) return null

    const onEachFeature: GeoJSONProps["onEachFeature"] = (
        { properties: p },
        layer,
    ) => {
        const { DISTRICT } = p
        layer.bindTooltip(`District ${DISTRICT}`, { sticky: true })
    }

    const onClick: LeafletMouseEventHandlerFn = e => {
        const map = e.target._map
        if (!map) return
        const districtBounds = e.target.getBounds()
        map.fitBounds(districtBounds)
    }

    return (
        <LayerGroup key={state_code}>
            {currentData.features.map((feature, i) => (
                <GeoJSON
                    key={i}
                    data={feature}
                    onEachFeature={onEachFeature}
                    eventHandlers={{
                        click: onClick,
                    }}
                />
            ))}
        </LayerGroup>
    )
}
