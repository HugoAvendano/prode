import { getFixture } from '@/actions'
import { Title } from '@/components'
import Link from 'next/link'
import React from 'react'
import { FaRegEdit } from "react-icons/fa";

export default async function FixturesPage() {

  const calendar = await getFixture();

  return (
    <>
      <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
          <Title title="Fixture Prode" />
          <div className="flex justify-end mb-5">
            <Link
              className="btn-primary"
              href="/admin/fixture/new"
            >
              Crear Fecha
            </Link>
          </div>
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
                  calendar.map(fixture => (
                    <tr key={fixture.id} className="bg-white border-b ">
                      <td className="text-sm  text-gray-900 font-light px-6  whitespace-nowrap">
                        {`#${fixture.number_fixture}`}
                      </td>
                      <td className="text-sm  text-gray-900 font-light px-6  whitespace-nowrap w-[30px]">
                        <Link
                          href={`/admin/fixture/${fixture.id}`}
                          
                          title='Editar Fecha'
                          
                        >
                          <FaRegEdit title='Editar Fecha' color='rgb(5,76,137)' size={30} />
                        </Link>
                      </td>
                    </tr>
                  ))
                }

              </tbody>

            </table>
          </div>
        </div>

      </div>
    </>
  )
}
