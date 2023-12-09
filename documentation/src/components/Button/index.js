import React from "react";
import Link from "@docusaurus/Link";

export default function Button({ href, text, styling }) {
  return (
    <Link className={styling} to={href}>
      {text}
    </Link>
  );
}
