import {getClass} from '../../api/class'
import {useEffect,useState} from 'react'
const List =()=>{
    const [list,setList] = useState([])
    useEffect(()=>{
        getClass(1,10,'').then(res=>{
            console.log(res)
            if(res.data.code === 200){
                setList(res.data.data.list)
            }
        })
    },[])
    return (
        <div>
          {}
        </div>
    )
}
export default List