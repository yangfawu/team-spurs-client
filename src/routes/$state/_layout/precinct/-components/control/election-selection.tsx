import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { selectElection, setElection } from "@/redux/precinct"
import { useMemo } from "react"
import Dropdown from "./dropdown"

export default function ElectionSelection() {
    const election = useAppSelector(selectElection)

    const dispatch = useAppDispatch()
    const updateElection = useMemo(() => {
        return (newElection: string) => {
            dispatch(setElection(newElection))
        }
    }, [])

    return (
        <Dropdown
            value={election}
            setValue={updateElection}
            options={["2020-presidential"]}
            tag="Election"
            format={String}
        />
    )
}
