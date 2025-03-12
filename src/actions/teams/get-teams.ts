'use server'

import { prisma } from "@/lib/prisma";



export const getTeams = async () => {
  try {
    const teams = await prisma.team.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    
    if (!teams) return [];

    return teams;
    
  } catch (error) {
    console.log(error);
    return []
  }

}