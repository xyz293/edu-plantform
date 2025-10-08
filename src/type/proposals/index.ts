export interface Proposalinit{
    teamId: number;
    initialScore: number;
    gameId: number;   
}

export interface TeamRank{
   name:string
    rank:number
    score:number
    teamId:number
}

export interface Order{
     gameId: number;
      roundTeamIds: number[][];
}
