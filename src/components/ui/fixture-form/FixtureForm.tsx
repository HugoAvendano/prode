'use client'

import { DateFixture, Match, validResult } from '@/interfaces/fixture.interfaces';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import clsx from 'clsx';
import { IoSaveOutline } from 'react-icons/io5';
import { saveUserFixture } from '@/actions';
import RadioButton from '../radio-button/RadioButton';
import { titleFont } from '../../../config/font';
import Image from 'next/image';



interface Props {
  currentFixture: Match[]
  view?: boolean
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

export default function FixtureForm({ currentFixture, view = false }: Props) {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      matches: currentFixture.map((match) => ({ selection: match.result ?? "", match_id: match.id })),
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data);
    const dataToSave = data.matches.map((match) => ({
      match_id: match.match_id,
      result: match.selection as validResult
    }))

    const fixture = await saveUserFixture(dataToSave);

    const { ok, predictsMatch } = fixture;

    console.log(ok, predictsMatch);

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-10 mx-auto my-4 overflow-x-auto sm:w-full">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-[rgb(5,76,137)]">
          <tr>
            <th className={`w-1/8 text-sm font-medium text-white text-center ${titleFont.className} antialiased font-bold`}>Local</th>
            <th className="w-1/4 text-sm font-medium "></th>
            <th className={`w-1/8 text-sm font-medium text-white text-center ${titleFont.className} antialiased font-bold`}>Empate</th>
            <th className="w-1/4 text-sm font-medium "></th>
            <th className={`w-1/8 text-sm font-medium text-white text-center ${titleFont.className} antialiased font-bold`}>Visitante</th>
          </tr>
        </thead>
        <tbody>
          {currentFixture.map((match, index) => (
            <tr key={index} className="bg-white h-6">
              <td className="text-sm font-thin text-gray-900 text-center">
                <RadioButton control={control} name={`matches.${index}.selection`} value="L" disabled={view} />
              </td>
              <td >                
                
                <div className= "flex items-right justify-end gap-2">
                  <span>{match.homeTeam.name}</span>
                  <Image
                    src={`/images/${match.homeTeam.url_image}`}
                    width={25}
                    height={25}
                    alt={match.homeTeam.name}
                    className="w-[25px] h-[25px] object-contain block"
                  />
                </div>
              </td>
              <td className="text-sm font-thin text-gray-900 text-center">
                <RadioButton
                  control={control}
                  name={`matches.${index}.selection`}
                  value="E"
                  disabled={view}
                />
              </td>
              <td>
              <div className= "flex items-left justify-start gap-2">
                  
                  <Image
                    src={`/images/${match.visitTeam.url_image}`}
                    width={25}
                    height={25}
                    alt={match.visitTeam.name}
                    className="w-[25px] h-[25px] object-contain block"
                  />
                  <span>{match.visitTeam.name}</span>
                  
                </div>
                
              </td>
              <td className="text-sm font-thin text-gray-900 text-center">
                <RadioButton control={control} name={`matches.${index}.selection`} value="V" disabled={view} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {errors.matches && (
        <p className="text-red-500 text-sm mt-2">Debe seleccionar una opción para todos los partidos.</p>
      )}

      {
        !view && (
          <div className="flex flex-col mb-2 pt-7">
            <button
              className='flex items-center justify-center  h-10 btn-primary'
              title='Guardar Pronostico'
              type='submit'
            >
              <IoSaveOutline size={30} />
            </button>

          </div>
        )
      }

    </form>
  );
};

