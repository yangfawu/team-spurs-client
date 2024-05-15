import { TileLayer } from "react-leaflet"

export default function DefaultTileLayer() {
    return (
        <TileLayer
            attribution={`Tiles @ &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    )
}
