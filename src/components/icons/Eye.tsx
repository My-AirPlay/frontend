import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={27}
    height={14}
    viewBox="0 0 27 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.97108 4.79995C6.64074 5.61118 4.50101 7.103 2.87171 9.27539L0.671326 7.07501M8.97108 4.79995C11.3087 3.98617 13.8382 3.85725 16.2366 4.41317C16.9528 4.57919 17.6574 4.80629 18.3417 5.09447M8.97108 4.79995L7.60539 0.870508M26.3599 6.58993L23.6744 9.27539C23.1431 8.56696 22.5575 7.93091 21.9287 7.36723C20.8428 6.39379 19.6281 5.63621 18.3417 5.09447M18.3417 5.09447L20.3673 1.00932"
      stroke="currentColor"
      strokeWidth={1.5}
    />
    <circle cx={13.5161} cy={11.0967} r={2.73926} fill="currentColor" />
  </svg>
);
export default SVGComponent;
