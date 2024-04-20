import tw from "tailwind-styled-components"

export default function SimpleLoader() {
    return (
        <div className="flex-1 flex justify-center p-4">
            <div className="w-full max-w-screen-md animate-pulse space-y-3">
                <div className="space-y-1">
                    <Panel className="h-12" />
                    <Panel className="h-4 max-w-56" />
                </div>
                <Panel className="h-16" />
                <Panel className="h-16" />
                <Panel className="h-16" />
            </div>
        </div>
    )
}

const Panel = tw.div`
    bg-gray-300
    rounded-lg
`
