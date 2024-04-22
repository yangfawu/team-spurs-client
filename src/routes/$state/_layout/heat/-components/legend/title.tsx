import { GROUP_TO_NAME } from "@/constants/group";
import { HEAT_LEVEL_TO_NAME } from "@/constants/heat-level";
import { selectGroup, selectLevel } from "@/redux/heat";
import { useAppSelector } from "@/redux/hooks";

export default function Title() {
    const group = useAppSelector(selectGroup)
    const level = useAppSelector(selectLevel)

    return (
        <h3 className="text-lg font-bold">
            Legend [{GROUP_TO_NAME[group]}, {HEAT_LEVEL_TO_NAME[level]} Level] 
        </h3>
    )
}
