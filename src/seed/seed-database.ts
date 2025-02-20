import { prisma } from "../lib/prisma";
import { teams } from "./seed";




async function main() {
  //1. Borrar registros previos
  await Promise.all([    
    prisma.team.deleteMany()       
  ]);

  // Crear Equipos

  const intiTeams = teams;

  await prisma.team.createMany({
    data: intiTeams
  });

  console.log("Teams created successfully...")

  // Crear fecha fixture
  
 
  

  

  console.log("Seed Executed successfully")

  


}

(()=>{
  if(process.env.NODE_ENV==="production") return;
  main();
})();