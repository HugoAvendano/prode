const revalidate = 0;

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const getUserPredicts = async () => {

  const session = await auth();
  const userId = session?.user?.id;
  
  try {
    const predictFixtures = await prisma.fixture.findMany({
      where: {
        Match: {
          some: {
            PredictMatch: {
              some: {
                id_user: userId
              }
            }
          }
        }
      }, 
      orderBy:{
        number_fixture: "asc"
      },      
    });

    return predictFixtures;
    
  } catch (error) {
    console.log(error);
    return []
  }
}