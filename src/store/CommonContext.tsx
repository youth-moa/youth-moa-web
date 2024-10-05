import { Dispatch, createContext } from "react";

export interface CommonDetaultState {
  alert: {
    isShow: boolean;
    message: string;
  };
  setCommon?: Dispatch<React.SetStateAction<CommonDetaultState>>;
}

export const defaultState = {
  alert: {
    isShow: false,
    message: "",
  },
};

export const CommonContext = createContext<CommonDetaultState>(defaultState);
