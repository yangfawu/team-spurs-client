import tw from "tailwind-styled-components"

export default function BigSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Spinner />
        </div>
    )
}

const Spinner = tw.div`
    w-20 h-20
    box-border border-2 border-l-0
    rounded-full border-black
    animate-spin
`
