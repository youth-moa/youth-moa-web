import { ReactNode, useState } from "react";
import {
  CommonContext,
  CommonDetaultState,
  defaultState,
} from "./CommonContext";

interface PropsType {
  children: ReactNode;
}

export function CommonProvider({ children }: PropsType) {
  const [common, setCommon] = useState<CommonDetaultState>(defaultState);

  return (
    <CommonContext.Provider value={{ ...common, setCommon }}>
      {children}
    </CommonContext.Provider>
  );
}
