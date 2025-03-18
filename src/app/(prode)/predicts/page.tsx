

import { getUserPredicts } from '@/actions';
import { Title } from '@/components'
import Link from 'next/link'
import React from 'react'
import { FaRegEdit, FaSearchPlus } from 'react-icons/fa'
import { IoCalendarOutline } from 'react-icons/io5';
import { BiCalendar, BiCalendarEdit } from "react-icons/bi";

import { LuCalendarSearch } from "react-icons/lu";


export default async function PredictsPage() {

  const predicts = await getUserPredicts();
  console.log(predicts)

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Mis pronosticos" />
        <div className="mb-10 mx-auto my-4 overflow-x-auto w-full">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-[rgb(5,76,137)]">
              <tr>
                <th scope="col" className="text-sm font-medium text-white  px-6 py-3 text-left">
                  Fecha Nro
                </th>
                <th scope="col" className="text-sm font-medium text-white  px-6 py-3 text-left w-[30px]">

                </th>                
              </tr>
            </thead>
            <tbody>
              {
                predicts.map(fixture => (
                  <tr key={fixture.id} className="bg-white border-b my-10">
                    <td className="text-sm  text-gray-900 font-light px-6  whitespace-nowrap">
                      {`#${fixture.number_fixture}`}
                    </td>
                    {
                      fixture.state === 'ENABLED' ? (
                        <td className="text-sm  text-gray-900 font-light px-6  whitespace-nowrap w-[30px]">
                          <Link
                            href={`/predicts/${fixture.id}`}
                            title='Editar Fecha'
                          >
                            <BiCalendarEdit title='Editar Fecha' color='rgb(5,76,137)' size={30} />
                          </Link>
                        </td>
                      ) : (
                        <td className="text-sm  text-gray-900 font-light px-6  whitespace-nowrap w-[30px]">
                          <Link
                            href={`/predicts/${fixture.id}`}
                          >
                            <BiCalendar  title='Ver Pronostico' color='rgb(5,76,137)' size={30} />
                          </Link>
                        </td>
                      )
                    }



                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
