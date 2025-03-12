'use client';

import { Match, Team } from '@/interfaces/fixture.interfaces';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoFootballOutline, IoSaveOutline, IoTrashOutline } from 'react-icons/io5';
import { addFixture } from '@/actions';
import { useRouter } from "next/navigation";




interface Props {
  teams: Team[];
  matches?: Match[]
}

type FormInputs = {
  idHomeTeam: string,
  idVisitTeam: string
}

const schema = yup.object().shape({
  idHomeTeam: yup.string().required("* Debe seleccionar un equipo local."),
  idVisitTeam: yup.string()
    .required("* Debe seleccionar un equipo visitante.")
    .test("not-same-team", "* No puedes elegir el mismo equipo como local y visitante.", function (value) {
      return value !== this.parent.idHomeTeam;
    })
});

export default function FixtureForm({ teams, matches = [] }: Props) {

  const filteredTeams = teams.filter(team =>
    !matches.some(match => match.homeTeam.id === team.id || match.visitTeam.id === team.id)
  );

  const [availableTeams, setAvailableTeams] = useState(filteredTeams);
  const [localTeam, setLocalTeam] = useState(filteredTeams);
  const [visitTeam, setVisitTeam] = useState(filteredTeams);
  const [matchesToSave, setMatchesToSave] = useState(matches);
  /* const [localTeam, setLocalTeam] = useState(teams);
  const [visitTeam, setVisitTeam] = useState(teams); */
  const router = useRouter();

  useEffect(() => {
    // Filtrar equipos disponibles de nuevo cuando `matches` cambie
    const filteredTeams = teams.filter(team =>
      !matches.some(match => match.homeTeam.id === team.id || match.visitTeam.id === team.id)
    );

    setLocalTeam(filteredTeams);
    setVisitTeam(filteredTeams);
  }, [matches, teams]);


  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
    }
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {


    const homeTeam = teams.find(team => team.id === data.idHomeTeam);
    const visitTeam = teams.find(team => team.id === data.idVisitTeam);





    if (!homeTeam || !visitTeam) return; // Evitar agregar datos inválidos

    const newMatchData = [{
      homeTeam,
      visitTeam
    }];

    setMatchesToSave(prev => [...prev, ...newMatchData]);


    // 🔥 Filtrar los equipos que ya fueron seleccionados
    setLocalTeam(prev => prev.filter(team => team.id !== homeTeam.id && team.id !== visitTeam.id));
    setVisitTeam(prev => prev.filter(team => team.id !== visitTeam.id && team.id !== homeTeam.id));

    // Resetear el formulario
    reset();

  }





  const saveUserFixture = async () => {
    const { ok, fixture, message } = await addFixture(matchesToSave, '')
    if (!ok) {
      alert(message);
      return
    }

    router.replace('/admin/fixture');

  }

  const eliminarPartido = (index: number) => {
    const newMatchesToSave = matchesToSave.filter((mathc, i) => i !==index);
    // Filtrar equipos disponibles de nuevo cuando `matches` cambie
    const filteredTeams = teams.filter(team =>
      !newMatchesToSave.some(match => match.homeTeam.id === team.id || match.visitTeam.id === team.id)
    );

    setMatchesToSave(prev => prev.filter((_, i) => i !== index));
    setLocalTeam(filteredTeams);
    setVisitTeam(filteredTeams);


  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 sm:gap-5 sm:grid-cols-3">
        <div className="flex flex-col mb-2">
          <span className='h-5 mb-2'>Equipo Local</span>
          <select
            className="p-2 border rounded-md bg-gray-200 h-10"
            {...register('idHomeTeam')}

          >
            <option value="">[ Select ]</option>
            {localTeam.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-2">
          <span className='h-5 mb-2'>Equipo Visitante</span>
          <select
            className="p-2 border rounded-md bg-gray-200 h-10"
            {...register('idVisitTeam')}
          >
            <option value="">[ Select ]</option>
            {visitTeam.map(team => (
              <option key={team.id} value={team.id}>{team.name}</option>
            ))}
          </select>

        </div>


        <div className="flex flex-col mb-2 pt-7">
          <button
            className='flex items-center justify-center  h-10 btn-primary'
            title='Agregar Partido'
            type="submit"
          >
            <IoFootballOutline size={30} />
          </button>

        </div>
        {
          <>
            <span className="text-red-500 text-xs">{errors.idHomeTeam?.message}</span>
            <span className="text-red-500 text-xs">{errors.idVisitTeam?.message}</span>
          </>

        }
      </form>

      <div className="mb-10 mx-auto my-4 overflow-x-auto sm:w-full">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-[rgb(5,76,137)]">
            <tr>
              <th className="w-1/8 text-sm font-medium text-white text-center">Local</th>
              <th className="w-1/4 text-sm font-medium text-white text-center"></th>
              <th className="w-1/8 text-sm font-medium text-white text-center">Empate</th>
              <th className="w-1/4 text-sm font-medium text-white text-center"></th>
              <th className="w-1/8 text-sm font-medium text-white text-center">Visitante</th>
              <th className="w-30 text-sm font-medium text-white text-center"></th>
            </tr>
          </thead>
          <tbody>
            {matchesToSave.map((match, index) => (
              <tr key={index} className={"bg-white"}>
                <td className="text-sm font-thin text-gray-900 text-center">
                  <input
                    type="radio"
                    disabled
                    className="w-4 h-4 my-1"
                  />
                </td>
                <td className="text-sm font-thin text-gray-900 text-center">{match.homeTeam.name}</td>
                <td className="text-sm font-thin text-gray-900 text-center">
                  <input
                    type="radio"
                    disabled
                    className="w-4 h-4 my-1"
                  />

                </td>
                <td className="text-sm font-thin text-gray-900 text-center">{match.visitTeam.name}</td>
                <td className="text-sm font-thin text-gray-900 text-center">
                  <input
                    type="radio"
                    disabled
                    className="w-4 h-4 my-1"
                  />
                </td>
                <th className="w-30">
                  <button
                    className='flex items-center justify-center  h-6'
                    title='Eliminar Partido'
                    onClick={() =>eliminarPartido(index)}
                    
                  >
                    <IoTrashOutline size={20} color='rgb(5,76,137)'/>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col mb-2 pt-7">
        <button
          className='flex items-center justify-center  h-10 btn-primary'
          title='Guardar Fecha'
          onClick={() => saveUserFixture()}
        >
          <IoSaveOutline size={30} />
        </button>

      </div>
    </>


  )
}



