export default function PopulationModule() {
    return (
        <div className="flex flex-col p-2 gap-2 w-full h-full overflow-auto">
            <h3 className="text-lg font-bold">Population Distribution</h3>
            <div className="flex-1 bg-gray-300 p-4 box-border flex items-center justify-center">
                <p className="text-center">
                    some kind of chart goes here how much of each group make up the total population of the state
                </p>
            </div>
        </div>
    )
}
