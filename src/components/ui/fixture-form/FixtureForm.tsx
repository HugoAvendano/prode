'use client'

import { DateFixture, Match, validResult } from '@/interfaces/fixture.interfaces';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import clsx from 'clsx';
import { IoSaveOutline } from 'react-icons/io5';
import { saveUserFixture } from '@/actions';



interface Props {
  currentFixture: Match[]
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

export default function FixtureForm({ currentFixture }: Props) {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      matches: currentFixture.map((match) => ({ selection: "", match_id: match.id })),
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data);
    const dataToSave = data.matches.map((match) =>({
      match_id: match.match_id,
      result: match.selection as validResult
    }))
   
    const fixture = await saveUserFixture(dataToSave);

    const {ok , predictsMatch} = fixture;

    console.log(ok,predictsMatch);

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
          {currentFixture.map((match, index) => (
            <tr key={index} className={clsx(
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
              <td className="text-sm font-thin text-gray-900 text-center">{match.homeTeam.name}</td>
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
              <td className="text-sm font-thin text-gray-900 text-center">{match.visitTeam.name}</td>
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
      <div className="flex flex-col mb-2 pt-7">
        <button
          className='flex items-center justify-center  h-10 btn-primary'
          title='Guardar Pronostico'
          type='submit'
        >
          <IoSaveOutline size={30} />
        </button>

      </div>
    </form>
  );
};

