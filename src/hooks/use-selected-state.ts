import State from "@/constants/state"
import { useParams } from "react-router-dom"

export default function useSelectedState() {
    const { state } = useParams() as { state: State }
    return state
}
