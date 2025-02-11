import FixtureForm from "@/components/ui/fixture-form/FixtureForm";
import { TopMenu } from "@/components/ui/top-menu/TopMenu";
import { titleFont } from "@/config/font";
import { initialData } from "@/seed/seed";
import Image from "next/image";

export default function Home() {

  const currentDate = initialData.dates_fixture[0];

  return (

    <>
      <FixtureForm currentDate={currentDate} />
    </>

  );
}
