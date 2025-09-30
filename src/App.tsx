import router from './router/index'
import {useRoutes} from 'react-router-dom'
function App() {
   const elem = useRoutes(router)
  return (
   <div>
    {elem}
   </div>
  )
}

export default App
