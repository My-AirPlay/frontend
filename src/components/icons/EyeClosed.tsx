import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={27}
    height={11}
    viewBox="0 0 27 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.2402 6.0494C9.25631 5.58955 7.36564 4.64251 5.7657 3.20827C5.16094 2.66614 4.59772 2.0544 4.08671 1.37305L1.50391 3.95585M11.2402 6.0494L10.443 9.99458M11.2402 6.0494C13.5469 6.58407 15.9797 6.46007 18.228 5.6774M18.228 5.6774C20.4692 4.89718 22.5272 3.4624 24.0942 1.37305L26.2104 3.48932M18.228 5.6774L19.5414 9.45663"
      stroke="currentColor"
      strokeWidth={1.5}
    />
  </svg>
);
export default SVGComponent;
