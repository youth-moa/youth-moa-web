import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";

import { createPortal } from "react-dom";

interface Propstype {
  portalId: string;
}

export const Portal = ({
  portalId,
  children,
}: PropsWithChildren<Propstype>) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById(portalId);
    let created = false;

    if (!element) {
      element = document.createElement("div");
      element.id = portalId;
      document.body.appendChild(element);
      created = true;
    }

    setPortalRoot(element);

    return () => {
      if (created && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [portalId]);

  if (!portalRoot) {
    return null;
  }

  return createPortal(children, portalRoot);
};
