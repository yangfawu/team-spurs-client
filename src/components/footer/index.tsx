import Info from "./info"
import Links from "./links"

export default function Footer() {
    return (
        <div className="bg-slate-300 py-8">
            <div className="max-w-screen-xl px-8 m-auto flex gap-8 flex-wrap">
                <Info />
                <Links />
            </div>
        </div>
    )
}
