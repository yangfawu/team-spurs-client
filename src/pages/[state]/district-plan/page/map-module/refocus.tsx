import RefocusButton from "@/components/leaflet/refocus-button"
import useSelectedState from "@/hooks/use-selected-state"
import Control from "react-leaflet-custom-control"

export default function Refocus() {
    const [state_code] = useSelectedState()

    return (
        <Control position="bottomright">
            <RefocusButton state={state_code} />
        </Control>
    )
}
