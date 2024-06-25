"use client";
import React, { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

type InputProps = {
  registerProp: string;
  register: UseFormRegister<any>;
  error?: string;
  valueAsNumber?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputForm = ({
  registerProp,
  register,
  error,
  valueAsNumber,
  ...rest
}: InputProps) => {
  return (
    <input
      className="py-2 my-2 rounded-md shadow-xl text-black placeholder-gray-500 focus:placeholder-gray-400"
      placeholder={rest.placeholder}
      type={rest.type}
      {...register(registerProp, { valueAsNumber })}
    />
  );
};
