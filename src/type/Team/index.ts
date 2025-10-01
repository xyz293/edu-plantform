export interface Team {
    gameId:number
   studentNum:number
   teamNum:number
}

export interface Teamlist {
   leaderId :number
   leaderName:string
   teamId:number
   leaderSno:string
   totalMembers:number
   members:TeamMember[]
}
export interface TeamMember {
   isLeader:boolean
   studentId:number
   studentName:string
  studentSno:string
}