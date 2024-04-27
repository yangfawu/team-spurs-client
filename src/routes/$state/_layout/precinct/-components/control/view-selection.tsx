import PrecinctView, { PRECINCT_VIEW_TO_NAME, SUPPORTED_PRECINCT_VIEWS } from "@/constants/precinct-view"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { selectView, setView } from "@/redux/precinct"
import { useMemo } from "react"
import Dropdown from "./dropdown"

export default function ViewSelection() {
    const view = useAppSelector(selectView)

    const dispatch = useAppDispatch()
    const updateView = useMemo(() => {
        return (newView: PrecinctView) => {
            dispatch(setView(newView))
        }
    }, [])

    return (
        <Dropdown value={view} setValue={updateView} options={SUPPORTED_PRECINCT_VIEWS} tag="View" format={formatter} />
    )
}

const formatter = (value: PrecinctView) => PRECINCT_VIEW_TO_NAME[value]
