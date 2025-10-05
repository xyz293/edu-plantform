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

export interface Chess{
    gameId:number
    file:File
}


export interface GradeRanks{
    teamId:number
    teamName:string
    thisRoundScore:number
}


export interface Assigns{
    gameId:number
    teamAssignCount:Record<number,number>
}


export interface Unselect{
    assignCount:number
    teamId:number
}


// ... existing code ...

export interface Occupy{
    gameId: number;
    teamId: number | null; // 允许为 null，表示未选择队伍
    tileIds: number[];
    triggerBlindBox: boolean;
    blindBoxTileIds: number[];
    triggerGoldCenter: boolean;
    goldCenterTileId: number;
    triggerChanceLand: boolean;
    chanceLandTileId: number;
    challengeSuccess: boolean;
}
export interface game{
    getRank : (id:number)=>void
}


export interface ReOutTeam{
    gameId: number;
     teamIds: number[]
     type:number
}