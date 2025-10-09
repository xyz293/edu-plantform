import { useState, useEffect, useRef } from 'react'
import type { TeamRanks } from "../../../type/game"
import type { Order } from '../../../type/proposals/index'
import { splitThree } from '../../../ulits/tool'
import { Button } from 'antd'

interface SelectTeamProps {
  id: number
  list: number[]
  teamRanks: TeamRanks[]
}

const SelectTeam = ({ id, list, teamRanks }: SelectTeamProps) => {
  const [team, setTeam] = useState<TeamRanks[]>([])
  const [teamIndex, setTeamIndex] = useState<number>(1)
  const [order, setOrder] = useState<Order>({
    gameId: Number(id),
    roundTeamIds: [[], []],
  })
  const [isOrder, setIsOrder] = useState<boolean[]>([])
  const [count, setCount] = useState<number>(0)
  const [scrollIndex, setScrollIndex] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)

  // 初始化筛选队伍和 checkbox 状态
  useEffect(() => {
    const filteredTeam = teamRanks.filter(item => !list.includes(item.teamId))
    setTeam(filteredTeam)
    setIsOrder(filteredTeam.map(() => false))
    setCount(0)
  }, [teamRanks, list])

  // 虚拟滚动
  const handleScroll = () => {
    if (ref.current) {
      setScrollIndex(Math.floor(ref.current.scrollTop / 50))
    }
  }

  const lists = team.slice(scrollIndex, scrollIndex + Math.floor(400 / 50))

  const showCount = (round: number) => {
    return splitThree(teamRanks.length - list.length)[round - 1]
  }

  const toggleCheckbox = (teamId: number, checked: boolean) => {
    const index = team.findIndex(t => t.teamId === teamId)
    if (index === -1) return

    setIsOrder(prev => {
      const copy = [...prev]
      copy[index] = checked
      setCount(copy.filter(Boolean).length)
      return copy
    })
  }

  const resetCheckbox = () => {
    setIsOrder(team.map(() => false))
    setCount(0)
  }

  return (
    <div>
      <h2>选择队伍</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Button onClick={() => { setTeamIndex(1); resetCheckbox() }}>第一轮</Button>
        <Button onClick={() => { setTeamIndex(2); setOrder({ ...order, roundTeamIds: [[], []] }); resetCheckbox() }}>第二轮</Button>
        <Button onClick={() => { setTeamIndex(3); setOrder({ ...order, roundTeamIds: [[], []] }); resetCheckbox() }}>第三轮</Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <h3>第 {teamIndex} 轮共 {showCount(teamIndex)} 组, 还可选择 {showCount(teamIndex) - count} 组</h3>
      </div>

      <div ref={ref} onScroll={handleScroll} style={{ height: '400px', overflowY: 'auto', position: 'relative' }}>
        <div style={{ height: team.length * 50 + 'px' }}>
          <div style={{ position: 'absolute', top: scrollIndex * 50 + 'px', left: 0, width: '100%' }}>
            {lists.map((item) => {
              const index = team.findIndex(t => t.teamId === item.teamId)
              return (
                <div key={item.teamId} style={{ display: 'flex', justifyContent: 'center', gap: '80px', alignItems: 'center', height: '50px' }}>
                  <div>第{item.teamId}组</div>
                  <div>{item.leaderName}</div>
                  <div>
                    <input
                      type="checkbox"
                      checked={isOrder[index]}
                      onChange={(e) =>{
                        if((showCount(teamIndex) - count )>0){
                          toggleCheckbox(item.teamId, e.target.checked)
                        }
                        else {
                          alert('已选择满组队伍')
                        }
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <Button type='primary' onClick={resetCheckbox}>重置</Button>
        <Button type='primary' onClick={() => console.log('提交选中队伍', team.filter((_, i) => isOrder[i]))}>提交</Button>
      </div>
    </div>
  )
}

export default SelectTeam
