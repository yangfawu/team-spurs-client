import Group from "@/constants/group"
import { useParams } from "react-router-dom"

export default function useSelectedGroup() {
    const { group } = useParams() as { group: Group }
    return group
}
