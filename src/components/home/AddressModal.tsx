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
    <ModalContainer onClose={onClose}>
      <DaumPostcode onComplete={handleComplete} autoClose />
    </ModalContainer>
  );
}
