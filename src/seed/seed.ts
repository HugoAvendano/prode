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
export const teams = [
  {
    name: "Aldosivi",
    url_image: "aldosivi.png"
  },{
    name: "Argentinos Jrs",
    url_image: "argentinos.png"
  },{
    name: "Atl. Tucuman",
    url_image: "atletico_tucuman.png"
  },{
    name: "Banfield",
    url_image: "banfield.png"
  },{
    name: "Barracas",
    url_image: "barracas.png"
  },{
    name: "Blegrano",
    url_image: "belgrano.png"
  },{
    name: "Boca Jrs",
    url_image: "boca.png"
  },{
    name: "Central Cordoba",
    url_image: "central_cordoba.png"
  },{
    name: "Defensa y Justicia",
    url_image: "defensa.png"
  },{
    name: "Estudiantes",
    url_image: "estudiantes.png"
  },{
    name: "Gimnasia",
    url_image: "gimnasia.png"
  },{
    name: "Godoy Cruz",
    url_image: "godoy_cruz.png"
  },{
    name: "Huracan",
    url_image: "huracan.png"
  },{
    name: "Independiete",
    url_image: "independiente.png"
  },{
    name: "Independiente Riv.",
    url_image: "independiente_rivadavia.png"
  },{
    name: "Instituto",
    url_image: "instituto.png"
  },{
    name: "Lanus",
    url_image: "lanus.png"
  },{
    name: "Newell's",
    url_image: "newells.png"
  },{
    name: "Platense",
    url_image: "platense.png"
  },{
    name: "Racing",
    url_image: "racing.png"
  },{
    name: "Dep. Riestra",
    url_image: "riestra.png"
  },{
    name: "River Plate",
    url_image: "river.png"
  },{
    name: "Rosario Central",
    url_image: "central.png"
  },{
    name: "San Lorenzo",
    url_image: "san_lorenzo.png"
  },{
    name: "San Martin (SJ)",
    url_image: "san_martin.png"
  },{
    name: "Sarmiento",
    url_image: "sarmiento.png"
  },{
    name: "Talleres",
    url_image: "talleres.png"
  },{
    name: "Tigre",
    url_image: "tigre.png"
  },{
    name: "Union",
    url_image: "union.png"
  },{
    name: "Velez",
    url_image: "velez.png"
  },
];