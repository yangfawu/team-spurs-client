import { SECTIONS } from "./data"

export default function Links() {
    return (
        <div className="flex-1 flex items-start justify-end gap-8">
            {SECTIONS.map(({ title, links }, index) => (
                <div key={index} className="flex-1 max-w-40 space-y-4">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <ul className="space-y-2">
                        {links.map(({ name, href }, index) => (
                            <li key={index}>
                                <a
                                    href={href}
                                    className="text-base font-normal hover:underline-1"
                                >
                                    {name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}
