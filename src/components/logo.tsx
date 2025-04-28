import React from "react";
import Image from "next/image";

import LogoIpsum from "$/public/assets/logoipsum.svg";

export function Logo() {
  return (
    <Image
      alt="logoipsum"
      src={LogoIpsum}
      width={200}
      height={60}
      className="h-6 w-48 object-contain"
    />
  );
}
