import { SUPPORTED_STATE_DIRECTORY, SupportedStateKey } from "@/constants/states"
import { useMemo } from "react"
import { useParams } from "react-router-dom"

export default function useSelectedState() {
    const { state: state_code } = useParams() as { state: SupportedStateKey }

    const state_name = useMemo(() => {
        return SUPPORTED_STATE_DIRECTORY[state_code]
    }, [state_code, SUPPORTED_STATE_DIRECTORY])
    
    return [state_code, state_name] as const
}
