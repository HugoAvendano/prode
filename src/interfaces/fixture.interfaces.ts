export interface match {
  id: string;
  home_team: string;
  visiting_team: string;  
  result?: validResult;
}

export interface date_fixture {
  id_date: string;
  date_number: number;
  matches: match[];
  
}

export type validResult = 'L'| 'E' | 'V'