import {
  useId,
  ComponentPropsWithoutRef,
  forwardRef,
  Ref,
  useState,
} from "react";

interface PropsType extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  size?: "small" | "medium";
}

function CheckboxComponent(props: PropsType, ref: Ref<HTMLInputElement>) {
  const {
    children,
    size = "medium",
    className,
    disabled,
    onChange,
    ...rest
  } = props;

  const checkboxId = useId();

  const [isChecked, setIsChecked] = useState(false);

  return (
    <label
      htmlFor={checkboxId}
      className={`w-full flex items-center justify-center gap-5 cursor-pointer ${
        disabled && "pointer-events-none cursor-not-allowed"
      }`}
    >
      <input
        type="checkbox"
        className="peer"
        id={checkboxId}
        disabled={disabled}
        readOnly
        hidden
        ref={ref}
        onChange={onChange}
        onClick={() => setIsChecked((prev) => !prev)}
        {...rest}
      />
      <div
        className={
          "flex justify-center items-center w-4 h-4 text-base text-white rounded-[3px] border-2 border-black transition-colors duration-75 ease-linear peer-checked:bg-blue peer-checked:border-blue peer-disabled:bg-gray-005 peer-disabled:border-gray-005 peer-disabled:peer-checked:bg-gray-005 peer-disabled:peer-checked:border-gray-005"
        }
      >
        {isChecked && <span className="text-xs select-none">✓</span>}
      </div>

      <span className={"select-none w-full"}>{children}</span>
    </label>
  );
}

export const Checkbox = forwardRef(CheckboxComponent);
