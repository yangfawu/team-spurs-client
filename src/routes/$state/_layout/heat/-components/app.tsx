import Control from "./control"
import Legend from "./legend"
import Map from "./map"

export default function App() {
    return (
        <div className="flex-1 flex flex-col">
            <div className="flex-1">
                <Map />
            </div>
            <div className="h-0.5 bg-black" />
            <div className="flex">
                <Control />
                <div className="w-0.5 bg-black"/>
                <Legend />
            </div>
        </div>
    )
}
