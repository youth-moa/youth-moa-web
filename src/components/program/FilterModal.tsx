import { useState } from "react";
import {
  IcoCancel,
  IcoCheckFilled,
  IcoCheckOutlined,
  IcoRefresh,
} from "../../assets";
import { BUTTON_TYPE } from "../../constants/keys";
import { ModalContainer } from "../../layouts/ModalContainer";
import { Button } from "../common/Button";

interface PropsType {
  title: string;
  list: { id: number; name: any; count?: number }[];
  seleted: number[];
  onClose: () => void;
  onSelected: (data?: number[]) => void;
}

export function FilterModal(props: PropsType) {
  const { title, list, seleted, onClose, onSelected } = props;

  const [newSelected, setNewSelected] = useState(seleted);

  const handleSelectItem = (id: number) => {
    if (newSelected.includes(id)) {
      const selectedList = newSelected.filter((item) => item !== id);
      setNewSelected(selectedList);

      return;
    }

    setNewSelected([...newSelected, id]);
  };

  const handleClickOk = () => {
    onSelected(newSelected);
    onClose();
  };

  return (
    <ModalContainer
      onClose={onClose}
      className={
        title === "청년센터"
          ? "md:max-w-[50rem]"
          : "md:max-w-[30rem] md:max-h-[35rem]"
      }
    >
      <section className="flex items-center justify-between mt-8 mx-11">
        <p className="text-xl font-semibold">{title}</p>

        <button onClick={onClose}>
          <IcoCancel stroke="#909092" />
        </button>
      </section>

      <section className="flex gap-2 my-4 overflow-x-auto mx-11 h-[60px] items-center">
        {newSelected.length > 0 &&
          newSelected?.map((item) => (
            <span className="bg-blue text-sm rounded-[20px] text-white w-fit px-[14px] py-1 flex items-center justify-between gap-3">
              <p className="w-max">{list?.find((l) => l.id === item)?.name}</p>
              <button onClick={() => handleSelectItem(item)}>
                <IcoCancel width={16} stroke="white" />
              </button>
            </span>
          ))}

        {newSelected.length === 0 && (
          <span className="bg-blue text-sm rounded-[20px] text-white w-fit px-[14px] py-1 flex items-center justify-between gap-3">
            <p className="w-max">전체</p>
          </span>
        )}
      </section>

      <section className="flex flex-wrap overflow-auto mx-11">
        {list?.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            count={item?.count}
            isChecked={newSelected.includes(item.id)}
            onClick={() => handleSelectItem(item.id)}
          />
        ))}
      </section>

      <section className="flex items-center h-12 gap-6 my-8 mx-11">
        <Button type={BUTTON_TYPE.outlined} onClick={() => setNewSelected([])}>
          <span className="flex items-center gap-1">
            <IcoRefresh fill="rgba(48, 60, 233, 1)" />
            초기화
          </span>
        </Button>
        <Button onClick={handleClickOk}>확인</Button>
      </section>
    </ModalContainer>
  );
}

interface ItemPropsType {
  name: string;
  count?: number;
  isChecked?: boolean;
  onClick: () => void;
}

function Item(props: ItemPropsType) {
  const { name, count, isChecked = false, onClick } = props;

  return (
    <button
      className="flex items-center justify-start gap-3 py-2 text-sm w-44"
      onClick={onClick}
    >
      <span className={isChecked ? "text-blue" : ""}>
        {isChecked ? (
          <IcoCheckFilled
            fill="rgba(63, 48, 233, 1)"
            stroke="rgba(63, 48, 233, 1)"
            width={14}
          />
        ) : (
          <IcoCheckOutlined stroke="rgba(111, 111, 111, 1)" width={14} />
        )}
      </span>
      <p>{name}</p>
      <span className="font-semibold text-blue">{count}</span>
    </button>
  );
}
