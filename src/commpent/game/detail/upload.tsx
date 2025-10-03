import { Uploadchess } from '../../../api/game'
import type { gameRound, Chess, GradeRanks } from '../../../type/game/index'
import { Button, Typography, message } from 'antd'
import { useState } from 'react'
import ReactECharts from "echarts-for-react";

const { Text } = Typography

interface UploadGradeProps {
  id: number
  Round: gameRound
  showUploadAssign: (showUploadAssign: boolean) => void
  gradeRanks: GradeRanks[]
}

const UploadGrade = ({ id, Round, showUploadAssign, gradeRanks }: UploadGradeProps) => {
  const [data, setData] = useState<Chess>({
    file: null,
    gameId: id,
  });

  const handleUpload = () => {
    if (!data.file) {
      message.warning("请先选择文件！");
      return;
    }
    const formData = new FormData()
    formData.append('file', data.file)
    formData.append('gameId', data.gameId.toString())

    Uploadchess(formData)
      .then((res) => {
        if (res.data.code === 200) {
          message.success('上传成功')
        } else {
          message.error(res.data.message || '上传失败')
        }
      })
      .catch((err) => message.error("上传出错：" + err))
  }

  const option = {
    title: {
      text: "本轮成绩排行榜",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    grid: {
      left: "15%",
      right: "10%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      name: "分数",
    },
    yAxis: {
      type: "category",
      data: gradeRanks.map((item) => item.teamName),
      inverse: true,
    },
    series: [
      {
        type: "bar",
        data: gradeRanks.map((item) => item.thisRoundScore),
        label: {
          show: true,
          position: "right",
        },
        itemStyle: {
          color: "#5470C6",
        },
      },
    ],
  };

  const renderPhase = () => {
    switch (Round.chessPhase) {
      case 0:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Text strong>上传领地阶段</Text>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setData({ ...data, file: e.target.files[0] });
                }
              }}
            />
            <Button type="primary" onClick={handleUpload}>
              上传
            </Button>
          </div>
        )
      case 1:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Button type="primary" onClick={() => showUploadAssign(true)}>
              上传分配
            </Button>
            <div style={{ width: "100%", height: 500 }}>
              <ReactECharts option={option} style={{ width: "100%", height: "100%" }} />
            </div>
          </div>
        )
      case 2:
        return <Text type="warning">走棋阶段</Text>
      case 3:
        return <Text type="secondary">游戏结束</Text>
    }
  }

  return (
    <div style={{
      padding: 16,
      border: '1px solid #d9d9d9',
      borderRadius: 8,
      background: '#ffffff'
    }}>
      <h3 style={{ marginBottom: 12 }}>游戏状态</h3>
      <Text>棋盘赛轮次：{Round.chessRound}</Text>
      <div style={{ marginTop: 16 }}>{renderPhase()}</div>
    </div>
  )
}

export default UploadGrade
