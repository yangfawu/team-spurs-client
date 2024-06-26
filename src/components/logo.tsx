import { Link } from "@tanstack/react-router"

export default function Logo() {
    return (
        <div className="flex items-center justify-center p-2">
            <Link className="flex items-center gap-2" to="/">
                <img src="/logo.png" className="w-8 h-8" />
                <h3 className="text-xl font-semibold">team spurs</h3>
            </Link>
        </div>
    )
}
