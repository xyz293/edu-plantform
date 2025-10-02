import { Uploadchess } from '../../../api/game'
import type { gameRound } from '../../../type/game/index'
import { Button, Upload, message, Typography } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

const { Text } = Typography

interface UploadGradeProps {
  id: number
  Round: gameRound
}

const UploadGrade = ({ id, Round }: UploadGradeProps) => {
  const handleUpload = (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('gameId', id.toString())

    Uploadchess(formData)
      .then((res) => message.success('上传成功'))
      .catch((err) => message.error('上传失败'))
  }

  const renderPhase = () => {
    switch (Round.chessPhase) {
      case 1:
        return (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Text>上传领地阶段</Text>
            <Upload
              beforeUpload={(file) => {
                handleUpload(file)
                return false
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />} type="primary">
                上传领地
              </Button>
            </Upload>
          </div>
        )
      case 2:
        return <Text>走棋阶段</Text>
      case 3:
        return <Text>游戏结束</Text>
      default:
        return <Text>未开始</Text>
    }
  }

  return (
    <div style={{ padding: 16, border: '1px dashed #1890ff', borderRadius: 8, background: '#f0f5ff' }}>
      <h3>游戏状态</h3>
      <Text>棋盘赛轮次：{Round.chessRound}</Text>
      <div style={{ marginTop: 10 }}>{renderPhase()}</div>
    </div>
  )
}

export default UploadGrade
