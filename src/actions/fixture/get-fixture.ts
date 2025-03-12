'use server'

import { prisma } from "@/lib/prisma";



export const getFixture = async () => {
  try {
    const fixtures = await prisma.fixture.findMany({
      orderBy: {
        number_fixture: 'asc'
      }
    });
    
    if (!fixtures) return [];

    return fixtures;
    
  } catch (error) {
    console.log(error);
    return []
  }

}