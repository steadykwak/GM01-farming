import "./styles/Form.style.scss";
import type { ChangeEvent } from "react";
import { CButton } from "./Button";

export type InputValueType = {
  name: string;
  phone: string;
};
interface CustomFormProps {
  submitCallback?: (value?: InputValueType) => void;
}

export const CustomForm = ({ submitCallback }: CustomFormProps) => {
  const [value, setValue] = useState<InputValueType>({ name: "", phone: "" });
  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target as HTMLInputElement;
    setValue((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    if (value.name === "" || value.phone === "") {
      alert("이름과 휴대폰 뒷자리 4자리를 모두 입력해주세요.");
      return false;
    }

    if (!/^\d{4}$/.test(value.phone)) {
      alert("휴대폰 뒷자리 4자리를 정확히 입력해주세요.");
      return false;
    }

    return true;
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    if (!submitCallback) return;
    submitCallback({ name: value.name, phone: value.phone });
  };
  return (
    <form id="form" onSubmit={onSubmit}>
      <div className="input-container">
        <input
          type="text"
          id="name"
          value={value.name}
          onChange={handleValue}
          placeholder="이름 입력"
        />
        <input
          type="text"
          id="phone"
          value={value.phone}
          placeholder="휴대폰 뒷자리 4자리"
          onChange={handleValue}
          maxLength={4}
        />
      </div>
      <CButton mode="default" id="searchBtn" type="submit">
        얼마나 열심히 했는지 보자!
      </CButton>
    </form>
  );
};
