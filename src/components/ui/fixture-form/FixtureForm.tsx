'use client'

import { date_fixture } from '@/interfaces/fixture.interfaces';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import clsx from 'clsx';


interface Props {
  currentDate: date_fixture
}

const schema = yup.object().shape({
  matches: yup
    .array()
    .of(
      yup.object().shape({
        selection: yup.string().required("Debe seleccionar una opción para este partido"),
        match_id: yup.string().required()
      })
    )
    .required(),
});

type FormInputs = {  
  matches: {
    selection: string;
    match_id: string
  }[];  
}

export default function FixtureForm({ currentDate }: Props) {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      matches: currentDate.matches.map((match) => ({ selection: "", match_id: match.id  })),
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data);
    const  { matches } = data;
    /**
     * TODO: Grabar en base de datos el
     * const fixture = await saveFixture(matches,session!.user.id)
     */
  } 

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-10 mx-auto my-4 overflow-x-auto sm:w-full">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-[rgb(5,76,137)]">
          <tr>
            <th className="w-1/8 text-sm font-medium text-white text-center">Local</th>
            <th className="w-1/4 text-sm font-medium text-white text-center"></th>
            <th className="w-1/8 text-sm font-medium text-white text-center">Empate</th>
            <th className="w-1/4 text-sm font-medium text-white text-center"></th>
            <th className="w-1/8 text-sm font-medium text-white text-center">Visitante</th>
          </tr>
        </thead>
        <tbody>
          {currentDate.matches.map((match, index) => (
            <tr key={index} className={ clsx (
              "bg-white",
              {
                'bg-red-500': errors.matches && errors.matches[index]
              }
            )}>
              <td className="text-sm font-thin text-gray-900 text-center">
                <Controller
                  name={`matches.${index}.selection` as const}
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center justify-center">
                      <input
                        {...field}
                        type="radio"
                        value="L"
                        className="w-4 h-4 my-1 transition-all duration-300 ease-in-out transform hover:scale-125 text-[rgb(5,76,137)]"
                      />
                    </div>
                  )}
                />
              </td>
              <td className="text-sm font-thin text-gray-900 text-center">{match.home_team}</td>
              <td className="text-sm font-thin text-gray-900 text-center">
                <Controller
                  name={`matches.${index}.selection` as const}
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center justify-center">
                      <input
                        {...field}
                        type="radio"
                        value="E"
                        className="w-4 h-4 my-1 transition-all duration-300 ease-in-out transform hover:scale-125 text-[rgb(5,76,137)]"
                      />
                    </div>
                  )}
                />
              </td>
              <td className="text-sm font-thin text-gray-900 text-center">{match.visiting_team}</td>
              <td className="text-sm font-thin text-gray-900 text-center">
                <Controller
                  name={`matches.${index}.selection` as const}
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center justify-center">
                      <input
                        {...field}
                        type="radio"
                        value="V"
                        className="w-4 h-4 my-1 transition-all duration-300 ease-in-out transform hover:scale-125 text-[rgb(5,76,137)]"
                      />
                    </div>
                  )}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {errors.matches && (
        <p className="text-red-500 text-sm mt-2">Debe seleccionar una opción para todos los partidos.</p>
      )}
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Enviar
      </button>
    </form>
  );
};

