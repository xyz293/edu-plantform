import {lazy} from 'react'
import {Suspense} from 'react'
import {Spin} from 'antd'

const Guard = lazy(() => import('../router/guard/index'))
const Login = lazy(() => import('../page/user/login'))
const Register = lazy(() => import('../page/user/login/regiser'))
const EmailLogin = lazy(() => import('../page/user/login/email'))
const PasswordLogin = lazy(() => import('../page/user/login/password'))
const Admir = lazy(() => import('../page/user/admir/index'))
const Class = lazy(() => import('../page/user/admir/class/index'))
const ClassDetail = lazy(() => import('../page/user/admir/class/Detail'))
const BaseGame = lazy(() => import('../commpent/game/base/baseGame'))
const GameControl =lazy(() => import('../page/user/admir/game/index'))
const BaseUser = lazy(() => import('../page/user/admir/user/index'))
const BaseGameControl = lazy(() => import('../commpent/game/base/baseGame'))
const Gamelist = lazy(() => import('../commpent/game/base/gameList'))
const GameDetail =lazy(()=>import('../page/user/admir/game/detail'))
const router =[
  {
    path:'/login',
    element:(
      <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Spin/></div>}>
        <Login/>
      </Suspense>
    ),
    children:[
      {
        path:'/login/email',
        element:(
          <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Spin/></div>}>
            <EmailLogin/>
          </Suspense>
        )
      },
      {
        path:'/login/password',
        element:(
          <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Spin/></div>}>
            <PasswordLogin/>
          </Suspense>
        )
      }
    ]
  },
  {
    path:'/admir',
    element:(
      <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Spin/></div>}>
        <Guard>
          <Admir/>
        </Guard>
      </Suspense>
    ),
    children:[
      {
        path:'/admir/class',
        element:(
          <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Spin/></div>}>
            <Class/>
          </Suspense>
        )
      },
      {
        path:'/admir/class/detail/:id',
        element:(
          <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Spin/></div>}>
            <ClassDetail/>
          </Suspense>
        )
      },
      {
        path:'/admir/class/baseGame/:id',
        element:(
          <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Spin/></div>}>
            <BaseGame/>
          </Suspense>
        )
      },
      {
        path:'/admir/game',
        element:(
          <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Spin/></div>}>
            <GameControl/>
          </Suspense>
        ),
        children:[
          {
            path:'/admir/game/baseGameControl',
            element:(
              <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Spin/></div>}>
                <BaseGameControl/>
              </Suspense>
            )
          },
          {
            path:'/admir/game/list',
            element:(
              <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Spin/></div>}>
                <Gamelist/>
              </Suspense>
            )
          }
        ]
      },
      {
        path:'/admir/user',
        element:(
          <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Spin/></div>}>
            <BaseUser/>
          </Suspense>
        )
      }
    ]
  },
  {
    path:'/register',
    element:(
      <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Spin/></div>}>
        <Register/>
      </Suspense>
    )
  },
   {
        path:'/admir/game/detail/:id',
        element:(
          <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Spin/></div>}>
            <GameDetail/>
          </Suspense>
        )
      },
]
export default router