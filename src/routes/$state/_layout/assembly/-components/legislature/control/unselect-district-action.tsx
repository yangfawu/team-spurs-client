import { clearDistrict, selectDistrict } from "@/redux/assembly"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useCallback } from "react"
import Action from "./action"

export default function UnselectDistrictAction() {
    const dispatch = useAppDispatch()
    const district = useAppSelector(selectDistrict)

    const deselect = useCallback(() => {
        dispatch(clearDistrict())
    }, [])

    if (!district) return null

    return (
        <div>
            <Action onClick={deselect}>unselect district {district.id}</Action>
        </div>
    )
}
