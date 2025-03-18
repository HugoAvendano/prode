
export const revalidate = 0;

import { prisma } from "@/lib/prisma";


export const getMatchesByFixture = async (idFixture: string) => {
  try {
    
    const fixtures = await prisma.match.findMany({

      where: { id_fixture_number: idFixture },
      select: {
        id: true,
        result: true,
        home_team: { select: { id: true, name: true, url_image: true } },
        visit_team: { select: { id: true, name: true, url_image: true } }
      }

    });

    if (!fixtures) return [];

    const fixturesFormatted = fixtures.map(fixture =>({
      id: fixture.id,
      result: fixture.result,
      homeTeam: fixture.home_team,  // Renombramos 'home_team' -> 'homeTeam'
      visitTeam: fixture.visit_team // Renombramos 'visit_team' -> 'visitTeam'
    }));


    return fixturesFormatted;

  } catch (error) {
    console.log(error);
    return []
  }

}