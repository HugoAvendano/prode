import { auth } from "@/auth.config";
import { Match } from "@/interfaces/fixture.interfaces";
import { prisma } from "@/lib/prisma";


export const getUserPredictById = async (idFixture: string) => {

  const session = await auth();
  const userId = session?.user?.id;

 

  try {
    const infoFixture = await prisma.fixture.findUnique({
      where: {
        id: idFixture
      }
    });
    const matches = await prisma.match.findMany({
      where: {
        fixture: {
          id: idFixture
        },
        PredictMatch: {
          some: {
            id_user: userId
          }
        }
      },
      include: {
        home_team: true,
        visit_team: true,
        PredictMatch: {
          select:{
            result_predict:true
          }
        },
      }
    });
    
    const predictMatches = matches.map(match => ({
      id: match.id,
      homeTeam: {
        id: match.home_team.id,
        name: match.home_team.name,
        url_image: match.home_team.url_image
      },
      visitTeam: {
        id: match.visit_team.id,
        name: match.visit_team.name,
        url_image: match.visit_team.url_image
      },
      result: match.PredictMatch[0].result_predict ?? null
    }));

    return{
      predicts: predictMatches,
      fixture: infoFixture
    } 
    
  } catch (error) {
    console.log(error);
    return {
      predicts: null,
      fixture: null
    }
  }
}