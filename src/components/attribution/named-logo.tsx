import { Link } from "react-router-dom"

export default function NamedLogo() {
    return (
        <Link className="flex items-center gap-2 p-2" to="/">
            <img src="/logo.png" className="w-8 h-8" />
            <h3 className="text-xl font-semibold">team spurs</h3>
        </Link>
    )
}
