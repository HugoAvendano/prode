'use server'

import { auth } from "@/auth.config";
import { PredictMatch } from '../../interfaces/fixture.interfaces';
import { prisma } from "@/lib/prisma";
import { match } from "assert";

export const saveUserFixture = async (predictsMatch: PredictMatch[]) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      ok: false,
      message: '500 - There is no user session'
    }
  }

  try {
    const prismaTransaction = await prisma.$transaction(async (tx) => {
      // 1. Elimino todos los pronosticos de la fecha del usuario si es que ya los pronosticos
      const predictMatchUser = await prisma.predictMatch.deleteMany({
        where: {
          AND: [
            {
              id_match: {
                in: predictsMatch.map(match => match.match_id)
              }
            },
            {
              id_user: userId
            }
          ]
        }
      });

      // 2. Creo los nuevos pronosticos de los partidos
      const data = predictsMatch.map(match => ({
        id_match: match.match_id,
        result_predict: match.result,
        id_user: userId
      }));

      const newPredictsMatch = await prisma.predictMatch.createMany({
        data: data
      });

      return {
        predict_match: newPredictsMatch
      }




    });

    /**
     * TO DO : revalidatePath(`/pronosticos`);
     */
    return{
      ok: true,
      predictsMatch: prismaTransaction.predict_match
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'ocurrio un error en el guardado del pronostico'
    }
  }

} 