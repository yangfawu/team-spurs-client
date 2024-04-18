import State from "@/constants/state"
import { useParams } from "@tanstack/react-router"

export default function useSelectedState() {
    const params = useParams({ strict: false })

    return state
}
