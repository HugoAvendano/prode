import { getUserPredictById } from '@/actions';
import { getCurrentFixture } from '@/actions/fixture/get-current.fixture';
import { Title } from '@/components';
import FixtureForm from '@/components/ui/fixture-form/FixtureForm';
import React from 'react'

interface Props {
  params: {
    id: string
  }
}

export default async function FixturesByIdPage({ params }: Props) {
  const { id } = await params;


  
  const infoPredictsMatch = await getUserPredictById(id);

  const predicts = infoPredictsMatch?.predicts?? [];
  const view = infoPredictsMatch?.fixture?.state !== "ENABLED"
  const numberFixture = infoPredictsMatch?.fixture?.number_fixture ?? '';

  
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title={`Fecha ${numberFixture}`} />
        <FixtureForm currentFixture={predicts} view= {view} />
      </div>
    </div>
  )
}
