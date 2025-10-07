import type { TeamRanks } from '../../../type/game/index'
import { Form, Input, Button } from 'antd'
import type { Proposalinit } from '../../../type/proposals/index'
import { useState, useEffect } from 'react'
import {init } from '../../../api/proposals'
import {GameStatus} from '../../../api/game'
const Store = ({ teamRanks, id }: { teamRanks: TeamRanks[]; id: number }) => {
  const list = teamRanks.filter(item => item.status === 1)
  const [data, setData] = useState<Proposalinit[]>([])


  useEffect(() => {
    const initData = list.map(() => ({
      teamId: 0,
      initialScore: 0,
      gameId: Number(id),
    }))
    setData(initData)
    GameStatus(id).then((res)=>{
      console.log(res)
    })
  }, [list.length, id]) // 注意：依赖只需长度或 id，不要依赖整个 list，否则重复执行
  const handleSubmit = async () => {
    try {
    const res = await init(data)
      console.log('初始化成功',res)
      if(res.data.code === 200){
        alert('初始化成功')

      }
    } catch (error) {
      console.error('初始化失败', error)
    }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Form>
        {list.map((item, index) => (
          <Form.Item key={item.teamId} label={<h2>第{item.teamId}组</h2>}>
            <Input
              type="number"
              min={0}
              max={100}
              value={data[index]?.initialScore ?? 0}
              onChange={e => {
                const value = Number(e.target.value)
                setData(prev => {
                  const newData = [...prev]
                  newData[index] = {
                    ...newData[index],
                    initialScore: value,
                    teamId: item.teamId,
                  }
                  return newData
                })
              }}
            />
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" onClick={() => {
            console.log(data)
            handleSubmit()
          }}>提交</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Store
