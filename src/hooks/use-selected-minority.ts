import { useParams } from "react-router-dom"

export default function useSelectedMinority() {
    const { group } = useParams() as { group: string }
    return group
}
