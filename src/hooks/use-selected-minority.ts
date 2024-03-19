import { SupportedEthnicityKey } from "@/constants/ethnicities"
import { useParams } from "react-router-dom"

export default function useSelectedMinority() {
    const { group } = useParams() as { group: SupportedEthnicityKey }
    return group
}
