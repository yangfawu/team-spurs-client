import Bar from "./bar"

export default function Legend() {
    return (
        <div className="flex flex-col p-2 gap-2 w-full h-full overflow-auto">
            <h3 className="text-lg font-bold">Heat Legend</h3>
            <Bar />
        </div>
    )
}
