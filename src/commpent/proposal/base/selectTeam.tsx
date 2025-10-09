import { useState, useEffect, useRef } from 'react'
import type { TeamRanks } from "../../../type/game"
import type { Order } from '../../../type/proposals/index'
import { splitThree } from '../../../ulits/tool'
import { Button } from 'antd'
import { ProposalsOrder } from '../../../api/proposals'


interface SelectTeamProps {
  id: number
  list: number[]
  teamRanks: TeamRanks[]
}

const SelectTeam = ({ id, list, teamRanks }: SelectTeamProps) => {
  // 当前可选队伍
  const [team, setTeam] = useState<TeamRanks[]>([])
  // 当前轮次（1、2、3）
  const [teamIndex, setTeamIndex] = useState<number>(1)
  // 提交数据对象（包含三轮的队伍id二维数组）
  const [order, setOrder] = useState<Order>({
    gameId: Number(id),
    roundTeamIds: [[], [], []],
  })
  // 每个 checkbox 是否勾选
  const [isOrder, setIsOrder] = useState<boolean[]>([])
  // 当前轮已勾选数量
  const [count, setCount] = useState<number>(0)
  // 虚拟滚动索引
  const [scrollIndex, setScrollIndex] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)

  // -------------------------------
  // 初始化：筛选出未在list中的队伍 + 初始化checkbox
  // -------------------------------
  useEffect(() => {
    const filteredTeam = teamRanks.filter(item => !list.includes(item.teamId))
    setTeam(filteredTeam)
    setIsOrder(filteredTeam.map(() => false))
    setCount(0)
  }, [teamRanks, list])

  // -------------------------------
  // 提交接口调用
  // -------------------------------
  const handleSubmit = async (data: Order) => {
    const res = await ProposalsOrder(data)
    console.log(res)
    if (res.data.code === 200) {
      alert('提交成功！')
      resetAll()
    } else {
      alert(res.data.message)
    }
  }

  // -------------------------------
  // 虚拟滚动计算
  // -------------------------------
  const handleScroll = () => {
    if (ref.current) {
      setScrollIndex(Math.floor(ref.current.scrollTop / 50))
    }
  }
  const lists = team.slice(scrollIndex, scrollIndex + Math.floor(400 / 50))

  // -------------------------------
  // 每轮可选的组数
  // -------------------------------
  const showCount = (round: number) => {
    return splitThree(teamRanks.length - list.length)[round - 1]
  }

  // -------------------------------
  // 切换checkbox勾选
  // -------------------------------
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

  // -------------------------------
  // 仅重置checkbox状态（切换轮次时用）
  // -------------------------------
  const resetCheckboxOnly = () => {
    setIsOrder(team.map(() => false))
    setCount(0)
  }

  // -------------------------------
  // 全部重置（点击“重置”按钮时）
  // -------------------------------
  const resetAll = () => {
    setIsOrder(team.map(() => false))
    setCount(0)
    setOrder({
      gameId: Number(id),
      roundTeamIds: [[], [], []],
    })
  }

  // -------------------------------
  // 轮次切换（保留历史选择）
  // -------------------------------
  const handleRoundChange = (round: number) => {
    setTeamIndex(round)
    resetCheckboxOnly()
  }

  // -------------------------------
  // 渲染部分
  // -------------------------------
  return (
    <div>
      <h2>选择队伍</h2>

      {/* 轮次切换按钮 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Button type={teamIndex === 1 ? 'primary' : 'default'} onClick={() => handleRoundChange(1)}>
          第一轮
        </Button>
        <Button type={teamIndex === 2 ? 'primary' : 'default'} onClick={() => handleRoundChange(2)}>
          第二轮
        </Button>
        <Button type={teamIndex === 3 ? 'primary' : 'default'} onClick={() => handleRoundChange(3)}>
          第三轮
        </Button>
      </div>

      {/* 统计信息 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        <h3>
          第 {teamIndex} 轮共 {showCount(teamIndex)} 组, 还可选择{' '}
          {showCount(teamIndex) - count} 组
        </h3>
      </div>

      {/* 虚拟滚动列表 */}
      <div
        ref={ref}
        onScroll={handleScroll}
        style={{ height: '400px', overflowY: 'auto', position: 'relative' }}
      >
        <div style={{ height: team.length * 50 + 'px' }}>
          <div
            style={{
              position: 'absolute',
              top: scrollIndex * 50 + 'px',
              left: 0,
              width: '100%',
            }}
          >
            {lists.map((item) => {
              const index = team.findIndex(t => t.teamId === item.teamId)
              const checked = isOrder[index] || order.roundTeamIds[teamIndex - 1].includes(item.teamId)
              return (
                <div
                  key={item.teamId}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '80px',
                    alignItems: 'center',
                    height: '50px',
                  }}
                >
                  <div>第{item.teamId}组</div>
                  <div>{item.leaderName}</div>
                  <div>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        const checked = e.target.checked

                        if (checked && (showCount(teamIndex) - count <= 0)) {
                          alert('已选择满组队伍')
                          return
                        }

                        // 更新当前轮次 order.roundTeamIds
                        setOrder(prev => {
                          const copy = prev.roundTeamIds.map(arr => [...arr])
                          if (checked) {
                            copy[teamIndex - 1].push(item.teamId)
                          } else {
                            copy[teamIndex - 1] = copy[teamIndex - 1].filter(id => id !== item.teamId)
                          }
                          return { ...prev, roundTeamIds: copy }
                        })

                        toggleCheckbox(item.teamId, checked)
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 底部按钮 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <Button onClick={resetAll}>重置</Button>
        <Button
          type="primary"
          onClick={() => {
            handleSubmit(order)
          }}
        >
          提交
        </Button>
      </div>
    </div>
  )
}

export default SelectTeam
