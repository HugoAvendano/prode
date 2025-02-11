type validResult= 'E' |'L' |'V';

interface match {
  id: string;
  home_team: string;
  visiting_team: string;  
  result?: validResult;
}

interface date_fixture {
  id_date: string;
  date_number: number;
  matches: match[];
  
}


interface SeedData {
  dates_fixture: date_fixture[];

}

export const initialData: SeedData = { 
  dates_fixture: [
    {
      id_date: '#0001',
      date_number: 1,
      matches:[
        {
          id: '#0001',
          home_team: 'Aldosivi',
          visiting_team: 'Barracas',          
        },
        {
          id: '#0002',
          home_team: 'Sarmiento',
          visiting_team: 'San Martin (SJ)',          
        },
        {
          id: '#0003',
          home_team: 'Banfield',
          visiting_team: 'Belgrano',          
        },
        {
          id: '#0004',
          home_team: 'Huracan',
          visiting_team: 'Tigre',          
        },
        {
          id: '#0005',
          home_team: 'Central Cordoba',
          visiting_team: 'Newell´s',          
        },
        {
          id: '#0006',
          home_team: 'Unión',
          visiting_team: 'Argentinos Jrs',          
        },
        {
          id: '#0007',
          home_team: 'Ind.Rivadavia',
          visiting_team: 'Estudiantes',          
        },
        {
          id: '#0008',
          home_team: 'Vélez',
          visiting_team: 'San Lorenzo',          
        },
        {
          id: '#0009',
          home_team: 'Central',
          visiting_team: 'Atl. Tucuman',          
        },
        {
          id: '#00010',
          home_team: 'River',
          visiting_team: 'Independiente',          
        },
        {
          id: '#00011',
          home_team: 'Racing',
          visiting_team: 'Boca Jrs.',          
        },
        {
          id: '#00012',
          home_team: 'Platense ',
          visiting_team: 'Instituto',          
        },
        {
          id: '#00013',
          home_team: 'Riestra Defensa',
          visiting_team: '',          
        },
        {
          id: '#00014',
          home_team: 'Gimnasia',
          visiting_team: 'Godoy Cruz',          
        },
        {
          id: '#00015',
          home_team: 'Talleres',
          visiting_team: 'Lanus',          
        }
      ]
    }
  ]


}




