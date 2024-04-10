export const generateGradientFunction = (min: [number, number, number], max: [number, number, number]) => {
    const [r1, g1, b1] = min
    const [r2, g2, b2] = max

    const r_diff = r2 - r1
    const g_diff = g2 - g1
    const b_diff = b2 - b1

    /**
     * @param heat a number between 0 and 1
     * @returns a string representing the color on the gradient
     */
    return function computeColor(heat: number) {
        const r = Math.floor(r1 + r_diff * heat)
        const g = Math.floor(g1 + g_diff * heat)
        const b = Math.floor(b1 + b_diff * heat)
        return `rgb(${r}, ${g}, ${b})`
    }
}
