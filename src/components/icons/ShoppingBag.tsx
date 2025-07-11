import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="currentColor"
    {...props}
  >
    <path
      d="M30.5 17.1c-.6 0-1.1-.5-1.1-1.1 0-3-2.4-5.4-5.4-5.4-3 0-5.4 2.4-5.4 5.4 0 .6-.5 1.1-1.1 1.1-.6 0-1.1-.5-1.1-1.1 0-4.2 3.5-7.7 7.7-7.7s7.7 3.4 7.7 7.7c-.1.6-.6 1.1-1.3 1.1z"
      fill="currentColor"
      fillOpacity="0.4"
    />
    <path 
      d="M30.3 39.7H17.7c-3.2 0-5.5-.8-6.9-2.4-1.4-1.6-1.9-4.1-1.4-7.3l1.2-9.1c.8-4.2 3.6-5.6 5.8-5.6h15.4c2.2 0 4.9 1.5 5.8 5.5l1.2 9.2c.4 3-.1 5.4-1.6 7.1-1.6 1.7-3.9 2.6-6.9 2.6zm-14-22.2c-.7 0-2.9.3-3.5 3.7l-1.2 9.1c-.4 2.5-.1 4.4.9 5.5.9 1.1 2.6 1.6 5.2 1.6h12.6c1.6 0 3.7-.3 5.1-1.8 1-1.2 1.4-3 1.1-5.3l-1.2-9.1c-.5-2.3-1.8-3.7-3.5-3.7H16.3z"
      fill="currentColor"
    />
  </svg>
)
export default SvgComponent
