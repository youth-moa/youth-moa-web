import { Button } from "./Button";
import { Portal } from "./Portal";

import { IcoErrorCircle } from "../../assets";
import { BUTTON_TYPE } from "../../constants/keys";

interface PropsType {
  message: string;
  onClose: () => void;
  onClick: () => void;
}

export function Notice(props: PropsType) {
  const { message, onClose, onClick } = props;

  return (
    // TODO: 애니메이션 추가
    <Portal portalId="notice-alert">
      <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full p-5">
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-30" />

        <section
          className="relative overflow-hidden bg-white sm:w-fit h-fit rounded-xl md:min-w-96 flex flex-col items-center justify-center w-full px-6 py-5 max-w-[373px] "
          onClick={(e) => e.stopPropagation()}
        >
          <IcoErrorCircle />

          <p className="mx-6 mt-4 mb-6 text-center md:mx-12">{message}</p>

          <div className="flex items-center w-full gap-2 h-[3.25rem]">
            <Button
              type={BUTTON_TYPE.outlined}
              color="border-gray-000 text-gray-000 bg-white"
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              color="bg-badge-rejected text-white border-badge-rejected"
              onClick={onClick}
            >
              확인
            </Button>
          </div>
        </section>
      </div>
    </Portal>
  );
}
