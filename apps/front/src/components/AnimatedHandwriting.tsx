"use client";

import { useEffect } from "react";
import Vara from "vara";

export const AnimatedHandwriting = () => {
  useEffect(() => {
    new Vara(
      "#vara-container",
      "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Parisienne/Parisienne.json",
      [
        {
          text: "L'atelier d'Amelie",
          fontSize: 40,
          strokeWidth: 1.5,
          letterSpacing: -1,
        },
      ]
    );
  }, []);

  return <div id="vara-container" className="z-[20]"></div>;
};
