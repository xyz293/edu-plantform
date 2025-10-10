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

export interface Proposalslist{
    id:number
    involvedTeamIds:number[]
    isSelected:boolean
    proposerTeamId:number
    proposerTeamName:string
    scoreDistribution:number[]
}

export interface Proposals{
      proposerTeamId: number;
      involvedTeamIds: number[];
      scoreDistribution: number[];
}

export interface ProposalsResponse{
    gameId: number;
    num: number;
    proposals: Proposals[];
}
export interface Voteinit{
        teamId: number;
        score: number;
        proposalId: number;
}
export interface Vote{
    gameId: number;
    round: number;
    votes: Voteinit[];
    hasTie: boolean;
}