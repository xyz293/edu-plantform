import routes from './router/index'
import {useRoutes} from 'react-router-dom'
import {useEffect} from 'react'
function App() {
   const elem = useRoutes(routes.router)
     const load =async()=>{
        await Promise.allSettled(
          routes.prel.map((item)=>{
            return Promise.resolve().then(()=>{
              item()
            }).then(()=>{
              console.log('预加载任务成功')
            }).catch((err)=>{
              console.error('预加载任务失败：', err)
            })
          })
        )
     }
   useEffect(()=>{
    load()
   },[])
  return (
   <div>
    {elem}
   </div>
  )
}

export default App
