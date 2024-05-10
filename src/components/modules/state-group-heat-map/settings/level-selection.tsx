import HeatLevel, { HEAT_LEVEL_TO_NAME, SUPPORTED_HEAT_LEVELS } from "@/constants/heat-level"
import { useHeatSettings } from "@/contexts/heat-settings"
import Dropdown from "./dropdown"

export default function LevelSelection() {
    const { level, setLevel } = useHeatSettings()

    return <Dropdown value={level} setValue={setLevel} options={SUPPORTED_HEAT_LEVELS} tag="Level" format={format} />
}

const format = (level: HeatLevel) => HEAT_LEVEL_TO_NAME[level]
