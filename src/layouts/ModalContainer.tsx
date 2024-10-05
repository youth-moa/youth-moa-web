import { ReactNode } from "react";

import { Portal } from "../components/common/Portal";

interface PropsType {
  children: ReactNode;
  onClose?: () => void;
}

export function ModalContainer(props: PropsType) {
  const { children, onClose } = props;

  return (
    <Portal portalId="modal">
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full p-5">
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-30"
          onClick={onClose}
        />

        <div
          className="relative flex flex-col w-full mx-1 overflow-hidden bg-white sm:w-fit h-fit rounded-xl md:min-w-96"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
}
