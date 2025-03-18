import { string } from "zod";

export interface Match {
  id?: string;
  homeTeam: Team;
  visitTeam: Team;  
  result: validResult;
}

export interface DateFixture {
  id_date: string;
  date_number: number;
  matches: Match[];
  
}

export interface Team {
  id: string;
  name: string;
  url_image: string;
}

export interface PredictMatch {
  match_id: string,
  result: validResult
}

export type validResult = 'L'| 'E' | 'V' | null; 