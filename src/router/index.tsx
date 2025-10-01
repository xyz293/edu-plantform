import {lazy} from 'react'
import {Suspense} from 'react'
import {Spin} from 'antd'

const Guard = lazy(() => import('../router/guard/index'))
const Login = lazy(() => import('../page/user/login'))
const Register = lazy(() => import('../page/user/login/regiser'))
const EmailLogin = lazy(() => import('../page/user/login/email'))
const PasswordLogin = lazy(() => import('../page/user/login/password'))
const Admir = lazy(() => import('../page/admir/index'))
const Class = lazy(() => import('../page/admir/class/index'))
const User = lazy(() => import('../page/user/class/index'))
const UserClass = lazy(() => import('../page/user/class/userclass'))
const ClassDetail = lazy(() => import('../page/admir/class/Detail'))
const BaseGame = lazy(() => import('../commpent/game/baseGame'))
const GameControl =lazy(() => import('../page/admir/game/index'))
const BaseUser = lazy(() => import('../page/admir/user/index'))
const BaseGameControl = lazy(() => import('../commpent/game/baseGame'))
const Gamelist = lazy(() => import('../commpent/game/gameList'))
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
    path:'/user',
    element:(
      <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Spin/></div>}>
        <Guard>
          <User/>
        </Guard>
      </Suspense>
    ),
    children:[
      {
        path:'class',
        element:(
          <Suspense fallback={<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Spin/></div>}>
            <UserClass/>
          </Suspense>
        )
      }
    ]
  }
]
export default router