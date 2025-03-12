'use server';

import { auth } from "@/auth.config";
import { Match } from "@/interfaces/fixture.interfaces";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const addFixture = async (matches: Match[], idFixture: string ) => {
  // Valido que el usuario haya inciado sesion.

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      ok: false,
      message: '500 - There is no user session'
    }
  }

  try {

    
    const transaction = await prisma.$transaction ( async (tx) => {
      // Obtengo el siguiete numero de fecha a crear
      const lastFixture = await prisma.fixture.findFirst({
        select: {
          number_fixture: true
        },
        orderBy: {
          number_fixture: 'desc'
        }
      });

      console.log('ultima_fecha', lastFixture);

      const numberFixture = lastFixture ? lastFixture.number_fixture + 1 : 1

      console.log('numero_nueva_fecha', numberFixture);

      // Creo la fecha
      const newFixture = await prisma.fixture.create({
        data:{
          number_fixture: numberFixture
        }
      });

      const idNewFixture = newFixture.id;

      // Creo los partidos de la fecha

      const createMatchPromise = matches.map( match => {
        return tx.match.create({
          data: {
            id_fixture_number: idNewFixture,
            id_home_team: match.homeTeam.id,
            id_visit_team: match.visitTeam.id
          }
        })
      })


      const createdMatched = await Promise.all(createMatchPromise);

      revalidatePath('/admin/fixture');
      revalidatePath(`/admin/fixture/${idNewFixture}`);
      

      return{        
        fixture: {
          id_date: idNewFixture,
          date_number: numberFixture,
          matches: createdMatched
        }
      }




    });

    return{
      ok: true,
      fixture: transaction.fixture
    }


    
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: error
    }
  }



}