import Control from "react-leaflet-custom-control"
import GroupSelection from "./group-selection"
import LevelSelection from "./level-selection"

export default function Settings() {
    return (
        <Control key="settings" position="topright">
            <div className="flex items-center gap-2">
                <GroupSelection />
                <LevelSelection />
            </div>
        </Control>
    )
}
