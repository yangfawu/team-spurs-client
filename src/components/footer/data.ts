interface Section {
    title: string
    links: { name: string; href: string }[]
}

export const SECTIONS: Section[] = [
    {
        title: "Sitemap",
        links: [
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
            { name: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Socials",
        links: [
            { name: "Twitter", href: "https://twitter.com" },
            { name: "GitHub", href: "https://github.com" },
            { name: "LinkedIn", href: "https://linkedin.com" },
        ],
    },
]
