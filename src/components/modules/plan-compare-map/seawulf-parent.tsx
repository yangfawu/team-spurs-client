import State from "@/constants/state"
import { LayersControl } from "react-leaflet"
import { useCompareContext } from "./context"
import SeawulfLayer from "./seawulf-layer"
import ShowCommentsButton from "./show-comments-button"

interface Props {
    state: State
}
export default function SeawulfParent({ state }: Props) {
    const { plan } = useCompareContext()

    if (plan === null) return null

    return (
        <>
            <LayersControl.Overlay name="Selected Seawulf Plan" checked>
                <SeawulfLayer state={state} plan={plan} />
            </LayersControl.Overlay>
            <ShowCommentsButton state={state} plan={plan} />
        </>
    )
}
