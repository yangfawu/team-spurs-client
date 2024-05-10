import HeatLevel, { HEAT_LEVEL_TO_NAME, SUPPORTED_HEAT_LEVELS } from "@/constants/heat-level"
import { selectLevel, setLevel } from "@/redux/heat"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useMemo } from "react"
import Dropdown from "./dropdown"

export default function LevelSelection() {
    const level = useAppSelector(selectLevel)

    const dispatch = useAppDispatch()
    const updateLevel = useMemo(() => {
        return (newLevel: HeatLevel) => {
            dispatch(setLevel(newLevel))
        }
    }, [])

    return <Dropdown value={level} setValue={updateLevel} options={SUPPORTED_HEAT_LEVELS} tag="Level" format={format} />
}

const format = (level: HeatLevel) => HEAT_LEVEL_TO_NAME[level]
