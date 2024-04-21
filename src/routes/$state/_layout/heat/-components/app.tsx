import Control from "./control"
import Legend from "./legend"
import Map from "./map"
import Modal from "./modal"

export default function App() {
    return (
        <>
            <div className="flex-1 flex flex-col">
                <Map />
                <div className="h-0.5 bg-black" />
                <div className="flex">
                    <Control />
                    <div className="w-0.5 bg-black" />
                    <Legend />
                </div>
            </div>
            <Modal />
        </>
    )
}
