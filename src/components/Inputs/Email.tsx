import { ChangeEvent, FocusEvent } from "react";

type InputProps = {
  inputClassName?: string;
  setStatus: any;
  status: { state: string | null; message: string };
};
export const EmailInput: React.FC<InputProps> = ({
  inputClassName,
  setStatus,
  status
}) => {
  const defaultStatus = { state: null, message: "" };
  const handleBlur = (evt: FocusEvent<HTMLInputElement, Element>) => {
    const isValid = evt.target.validity.valid;
    if (evt.target.value === "" || !evt.target.value) {
      return setStatus(defaultStatus);
    }
    if (isValid) {
      setStatus(defaultStatus);
    } else {
      setStatus({
        state: "error",
        message: evt.target.validationMessage
      });
    }
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (status.message === "") return;
    const isValid = evt.target.validity.valid;
    if (isValid) {
      setStatus(defaultStatus);
    }
  };

  return (
    <input
      className={inputClassName}
      placeholder="Enter your email"
      formNoValidate
      type="email"
      onBlur={handleBlur}
      onChange={handleChange}
      required
      name="email"
    />
  );
};
