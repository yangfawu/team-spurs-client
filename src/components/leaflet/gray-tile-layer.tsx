import { TileLayer } from "react-leaflet"

export default function GrayTileLayer() {
    return (
        <TileLayer
            attribution={`Tiles @ &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`}
            url="https://abcd.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
    )
}
