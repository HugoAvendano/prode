

import React from 'react'
import { Title } from '@/components';
import { getTeams } from '@/actions';

import { getMatchesByFixture } from '@/actions/fixture/get-matches-by-fixture';
import FixtureForm from './ui/FixtureForm';


interface Props {
  params: {
    slug: string
  }
}

export default async function FixturePage({ params }: Props) {

  const { slug } = await params;
  console.log('FIXTURE',slug);

  const [teams, matches] = await Promise.all([
    getTeams(),
    getMatchesByFixture(slug)
  ]);



  const subtitle = (slug === 'new') ? 'Nueva Fecha' : 'Editar Fecha';

  return (
    <>
      
        <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">



          <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

            <Title title="Fixture" subtitle={subtitle} />

            <FixtureForm teams={ teams} matches = {matches} />

          </div>




        </div>
      

    </>
  );

}




