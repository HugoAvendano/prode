'use server'

import { prisma } from "@/lib/prisma";
import { getUserPredictById } from "../predicts/get-user-predict-by-id";
import { auth } from "@/auth.config";
import { Match, validResult } from "@/interfaces/fixture.interfaces";

export const getCurrentFixture = async () => {
  try {

    const session = await auth();
    const userId = session?.user?.id ?? '';

    // Buscamos el fixture actual

    const currentFixture = await prisma.fixture.findFirst({
      where: {
        state: "ENABLED"
      }
    });

    // Valido si el usuario ya realizo sus predicciones para el fixture actual devuelvo las predicciones

    const userPredictCurrentFixture = await getUserPredictById(currentFixture?.id ?? '');

    if (userPredictCurrentFixture!.predicts!.length > 0) {
      return userPredictCurrentFixture
    }  

    
    // El usuario no realizo pronosticos de la fecha actual entonces busco la los partidos del fixture actual
    const currentMatches =  await prisma.match.findMany({

      where: { 
        fixture: {
          state: "ENABLED"
        } 
      },
      select: {
        id: true,        
        home_team: { select: { id: true, name: true, url_image: true } },
        visit_team: { select: { id: true, name: true, url_image: true } },        
      }

    });

    


    // Formateo los partidos
    const fixturesFormatted  = currentMatches.map(fixture =>({
      id: fixture.id,
      /* result: fixture.result, */
      homeTeam: fixture.home_team,  // Renombramos 'home_team' -> 'homeTeam'
      visitTeam: fixture.visit_team, // Renombramos 'visit_team' -> 'visitTeam' 
      result: null
    }));

    

    return {
      predicts: fixturesFormatted,
      fixture: currentFixture
    } 

     

  } catch (error) {
    console.log(error);
    return {
      predicts: [],
      fixture: null
    }
  }

}