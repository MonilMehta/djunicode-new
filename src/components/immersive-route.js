"use client";

import { useEffect } from "react";

export function ImmersiveRoute({ bodyClassName = "immersive-route" }) {
  useEffect(() => {
    document.body.classList.add(bodyClassName);

    return () => {
      document.body.classList.remove(bodyClassName);
    };
  }, [bodyClassName]);

  return null;
}
