import { ReactNode } from "@tanstack/react-router"

interface Props {
    title: ReactNode
    pop: number
    reps: number
}
export default function TooltipContent({ title, pop, reps }: Props) {
    return (
        <div className="bg-white shadow p-2">
            <p>{title}</p>
            <p>
                <span className="font-semibold">Population:</span> {pop.toLocaleString()}
            </p>
            <p>
                <span className="font-semibold">Representatives:</span> {reps.toLocaleString()}
            </p>
        </div>
    )
}
