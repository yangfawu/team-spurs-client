import { TileLayer } from "react-leaflet"

export default function GrayWorldTileLayer() {
    return (
        <TileLayer
            // attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />
    )
}
