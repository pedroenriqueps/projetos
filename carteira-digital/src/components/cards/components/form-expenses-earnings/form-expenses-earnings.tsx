"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputForm } from "../../../../hooks/inputs/input-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateExpenses, CreateEarnings } from "@/api/services/post-connect";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormProps = {
  valueNumber: number;
  date: string;
  description: string;
};

type ComponentProps = {
  typeComponent: string;
  placeholderInputValue?: string;
  placeholderInputDescrioption?: string;
};

const schema = Yup.object().shape({
  valueNumber: Yup.number()
    .typeError("Informe um número válido")
    .nullable()
    .positive("O número deve ser positivo")
    .required("Informe o valor que foi gasto"),
  date: Yup.string().required("Informe uma data"),
  description: Yup.string().required("Informe uma descrição"),
});

export default function FormCard({
  typeComponent = "",
  placeholderInputValue = "",
  placeholderInputDescrioption = "",
}: ComponentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      date: "",
      description: "",
    },
  });

  const handleChange: SubmitHandler<FormProps> = async (data) => {
    setIsSubmitting(true);
    try {
      if (typeComponent === "spending") {
        await CreateExpenses(data);
        toast.success("Despesa criada com sucesso!");
      } else if (typeComponent === "earnings") {
        await CreateEarnings(data);
        toast.success("Receita criada com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao processar a solicitação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
    reset();
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.dismiss();
      const firstErrorMessage = Object.values(errors)[0]?.message || "";
      if (firstErrorMessage) {
        toast.error(firstErrorMessage);
      }
    }
  }, [errors]);

  return (
    <>
      <div>
        <form
          method="post"
          className="flex flex-col gap-y-4"
          onSubmit={handleSubmit(handleChange)}
        >
          <InputForm
            type="number"
            placeholder={placeholderInputValue}
            registerProp="valueNumber"
            register={register}
            error={errors.valueNumber?.message}
          />

          <InputForm
            type="date"
            registerProp="date"
            register={register}
            error={errors.date?.message}
          />

          <InputForm
            placeholder={placeholderInputDescrioption}
            registerProp="description"
            type="text"
            register={register}
            error={errors.description?.message}
          />

          <div className="flex justify-center mt-7">
            <button className="rounded-lg relative w-36 hover:w-auto h-10 cursor-pointer flex items-center border text-slate-50 border-green-500 bg-green-500 group hover:bg-green-500 active:bg-green-500 active:border-green-500">
              <span className="text-gray-200 font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300"></span>
              <span className="absolute right-0 h-full w-10 rounded-lg bg-green-500 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
                <svg
                  className="svg w-8 text-white"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="12" x2="12" y1="5" y2="19"></line>
                  <line x1="5" x2="19" y1="12" y2="12"></line>
                </svg>
              </span>
              Add item
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
