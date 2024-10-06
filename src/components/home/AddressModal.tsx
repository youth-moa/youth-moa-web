import { ModalContainer } from "../../layouts/ModalContainer";
import DaumPostcode from "react-daum-postcode";

interface PropsType {
  onClose: () => void;
  onChangeAddress: (address: string) => void;
}

export function AddressModal(porps: PropsType) {
  const { onClose, onChangeAddress } = porps;

  const handleComplete = (data: any) => {
    let fullAddress = data.roadAddress ?? data.jibunAddress;

    onChangeAddress(fullAddress);
    onClose();
  };

  return (
    <ModalContainer onClose={onClose} className="sm:w-fit md:min-w-96">
      <DaumPostcode onComplete={handleComplete} autoClose />
    </ModalContainer>
  );
}
