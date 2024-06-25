import { UseFormRegister } from "react-hook-form";

type IncomeTypeSelectProps = {
  setTypeIncome: React.Dispatch<React.SetStateAction<boolean>>;
  registerProp: string;
  register: UseFormRegister<any>;
};
export const IncomeTypeSelect = ({
  setTypeIncome,
  registerProp,
  register,
}: IncomeTypeSelectProps) => {
  return (
    <select
      className="w-full p-4 pl-2 rounded-md text-black bg-white"
      {...register(registerProp)}
      onChange={(e) => {
        setTypeIncome(e.target.value === "fixe");
      }}
    >
      <option value="">Informe o tipo da renda</option>
      <option value="fixe">Renda fixa</option>
      <option value="variable">Renda variável</option>
      <option value="others">Outros</option>
    </select>
  );
};
