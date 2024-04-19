import { StateGeoFeature, fetchAllStatesMap } from "@/api/map"
import { STATE_TO_NAME } from "@/constants/state"
import { useGeoLayerRef } from "@/contexts/geo-layer-ref"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useMemo } from "react"
import { FeatureGroup, GeoJSON, GeoJSONProps } from "react-leaflet"

export default function GeoLayer() {
    const geoRef = useGeoLayerRef()
    const navigate = useNavigate()

    const { data } = useSuspenseQuery(fetchAllStatesMap())

    const onEachFeature: GeoJSONProps["onEachFeature"] = useMemo(() => {
        return ({ properties }: StateGeoFeature, layer) => {
            const { state } = properties
            layer.bindTooltip(STATE_TO_NAME[state], { sticky: true })

            // On click, navigate to the state's page
            layer.on("click", () => {
                navigate({ to: "/$state/", params: { state } })
            })
        }
    }, [])

    const getStyle: GeoJSONProps["style"] = useMemo(() => {
        return () => ({ fillColor: Fill.REGULAR })
    }, [])

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
    // SELECTED = "black",
}
