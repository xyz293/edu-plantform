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


export interface Occupy{
   gameId: number;               // 游戏ID
    teamId: number;               // 队伍ID
    tileIds: number[];            // 要占领的格子ID数组
    triggerBlindBox: boolean;     // 是否触发盲盒格子事件
    blindBoxTileIds: number[];    // 触发的盲盒格子ID
    triggerGoldCenter: boolean;   // 是否触发金币中心事件
    goldCenterTileId: number;     // 触发的金币中心格子ID
    triggerChanceLand: boolean;   // 是否触发机会格子事件
    chanceLandTileId: number;     // 触发的机会格子ID
    challengeSuccess: boolean;    // 占领挑战是否成功
}