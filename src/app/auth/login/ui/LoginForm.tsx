'use client'

import { authenticate } from "@/actions";
import clsx from "clsx"
import Link from "next/link"
import { startTransition, useEffect } from "react";
import { useActionState } from "react";

import { IoInformationOutline } from "react-icons/io5"

import { useFormStatus } from "react-dom";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import InputPassword from "@/components/ui/input-password/InputPassword";


type LoginFormInputs = {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required("* El email es un campo requerido.").email("* Formato de email incorrecto."),
  password: yup.string().required("* El password es un campo requerido.")

})

export const LoginForm = () => {

  const [state, dispatch] = useActionState(authenticate, undefined);

  const { pending } = useFormStatus();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });



  useEffect(() => {
    if (state === 'Success') {
      window.location.replace("/");
    }
  }, [state])

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    const formData = new FormData();
  
    // Convertir el objeto data a FormData
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    dispatch(formData);

    startTransition(() => {
      const formData = new FormData();

      // Convertir el objeto data a FormData
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      dispatch(formData); // ✅ Ahora está dentro de startTransition
    });
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        {...register('email')}
      />
      
      <InputPassword register={register("password")} error={errors.password?.message} />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "Invalid credentials." && (
          <div className="flex felx-row mb-2">
            <IoInformationOutline className="h-5 w-5 text-red-500" size={20} />
            <p className="text-sm text-red-500">{'Credenciales Invalidas'}</p>
          </div>
        )}
      </div>

      <LoginButton />


      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/new-account"
        className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>

    </form>
  )
}

const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending

      })}
      disabled={pending}
    >
      Ingresar
    </button>
  )
}