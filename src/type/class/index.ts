export interface Class {
    id: number
   classCode: string
   gmtCreate: string
   currentStudents: number
   tid: number
}
export interface ClassStudent {
    cid: number
    pageNum: number
    pageSize: number
    key: string
}
export interface ClassStudentList {
  id:number
  cid:number
  sno:string
  name:string
}

export interface ClassUpload {
    file:File,
    id:number,
}