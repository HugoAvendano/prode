import { getCurrentFixture } from "@/actions/fixture/get-current.fixture";
import FixtureForm from "@/components/ui/fixture-form/FixtureForm";
import { TopMenu } from "@/components/ui/top-menu/TopMenu";
import { titleFont } from "@/config/font";
import { initialData } from "@/seed/seed";
import Image from "next/image";

export default async function Home() {

  const currentFixture = await getCurrentFixture();

  return (

    <>

      <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
        <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
          <FixtureForm currentFixture={currentFixture} />
        </div>
      </div>

    </>

  );
}
