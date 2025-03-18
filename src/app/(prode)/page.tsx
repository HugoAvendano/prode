import { getCurrentFixture } from "@/actions/fixture/get-current.fixture";
import FixtureForm from "@/components/ui/fixture-form/FixtureForm";
import { Match, PredictMatch } from '../../interfaces/fixture.interfaces';
import { Title } from "@/components";


export default async function Home() {

  const currentFixture = await getCurrentFixture();
  console.log(JSON.stringify(currentFixture,null,2))
  
  const predicts = currentFixture!.predicts?? [];
  const view = currentFixture?.fixture?.state !== "ENABLED"
  const numberFixture = currentFixture?.fixture?.number_fixture ?? '';

  return (

    <>

      <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
        <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
          <Title title={`Fecha ${numberFixture}`} />
           <FixtureForm currentFixture={predicts} view = {view} />
        </div>
      </div>

    </>

  );
}
