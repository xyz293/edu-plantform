export interface Game{
    file:File,
    teamNum:number,
    studentNum:number,
    perTeamNum:number,
    cid:number,
}

export interface GameList{
    id:number
    gmtCreate:string
    status:number,
    studentCount:number,
    teamCount:number,
}

export interface GameInit{
  gameId: number,
  totalTiles: number,
  blackSwampTiles: number[],
  blindBoxTiles: { tileId: number; eventType: number }[],
  fortressTiles: { tileId: number; gameType: number }[],
  goldCenterTiles: number[],
  opportunityTiles: number[]
}

export interface TeamRanks{
    leaderName:string
    leaderSno:string
    status:number
    teamId:number
    totalScore:number
    totalTile:number
}

export interface StudentRanks{
   individualScore:number
    memberSno:string
    studentId:number
    studentName:string
    teamId:number
}

export interface gameRound{
    proposalRound:number
    proposalStage:number
    stage:number
    chessPhase:number
    chessRound:number
}