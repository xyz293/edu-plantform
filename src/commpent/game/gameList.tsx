import { ClassGameList } from '../../api/game'
import { getClass } from '../../api/class'
import { useEffect, useState } from 'react'
import type { Class } from '../../type/class/index'
import { Select } from 'antd'
import type { GameList } from '../../type/game/index'

const List = () => {
  const [classList, setClassList] = useState<Class[]>([])
  const [gameList, setGameList] = useState<GameList[]>([])

  useEffect(() => {
    getClass(1, 10, '').then((res) => {
      console.log(res)
      setClassList(res.data.data.list)
    })
  }, [])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Select
          onChange={(value) => {
            // value 就是选中的班级 id
            ClassGameList(value).then((res) => {
              console.log(res)
              setGameList(res.data.data)
            })
          }}
          style={{ width: 200 }}
          options={classList.map((item) => {
            return {
              value: item.id,
              label: item.classCode,
            }
          })}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {gameList.length === 0 ? (
          <div>暂无游戏</div>
        ) : (
          gameList.map((item) => {
            return (
              <div
                key={item.gmtCreate}
                style={{
                  background: '#f0f9ff', // 浅蓝背景
                  border: '1px solid #91d5ff', // 蓝色边框
                  borderRadius: '8px', // 圆角
                  padding: '16px',
                  width: '200px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // 阴影
                }}
              >
                <div>
                  <strong>游戏时间：</strong> {item.gmtCreate}
                </div>
                <div>
                  <strong>状态：</strong> {item.status === 0 ? '未开始' : '已开始'}
                </div>
                <div>
                  <strong>学生人数：</strong> {item.studentCount}
                </div>
                <div>
                  <strong>队伍人数：</strong> {item.teamCount}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default List
