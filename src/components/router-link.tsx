import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";

const RouterLink = tw(Link)`
    text-blue-600
    underline-1
    hover:underline
`

export default RouterLink
