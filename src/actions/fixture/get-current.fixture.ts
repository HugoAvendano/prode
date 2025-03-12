'use server'

import { prisma } from "@/lib/prisma";

export const getCurrentFixture = async () => {
  try {
    
    const fixture = await prisma.match.findMany({

      where: { 
        fixture: {
          state: "ENABLED"
        } 
      },
      select: {
        id: true,
        result: true,
        home_team: { select: { id: true, name: true, url_image: true } },
        visit_team: { select: { id: true, name: true, url_image: true } }
      }

    });

    if (!fixture) return [];



    const fixturesFormatted = fixture.map(fixture =>({
      id: fixture.id,
      /* result: fixture.result, */
      homeTeam: fixture.home_team,  // Renombramos 'home_team' -> 'homeTeam'
      visitTeam: fixture.visit_team // Renombramos 'visit_team' -> 'visitTeam'
    }));


    return fixturesFormatted;

  } catch (error) {
    console.log(error);
    return []
  }

}