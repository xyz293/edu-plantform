import { getClass } from '../../api/class';
import { useEffect} from 'react';
import type { Class } from '../../type/class/index'
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Space } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const List = ({list,setList}:{list:Class[],setList:(list:Class[])=>void}) => {
  
  const navigate = useNavigate();

  useEffect(() => {
    getClass(1, 10, '').then((res) => {
      console.log(res);
      if (res.data?.code === 200) {
        setList(res.data.data?.list || []);
      }
    });
  }, []);

  // 可选：格式化时间（示例）
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={3} style={{ marginBottom: '24px', textAlign: 'center' }}>
        班级列表
      </Title>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
          justifyContent: 'center',
        }}
      >
        {list.map((item) => (
          <Card
            key={item.id}
            hoverable
            style={{
              width: '100%',
              maxWidth: '320px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s',
            }}
            bodyStyle={{ padding: '20px' }}

          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Text strong>班级编码：</Text>
                <Text copyable>{item.classCode}</Text>
              </div>

              <div>
                <Text>
                  <UserOutlined style={{ marginRight: '6px', color: '#1890ff' }} />
                  当前人数：{item.currentStudents}
                </Text>
              </div>

              <div>
                <Text type="secondary">
                  <CalendarOutlined style={{ marginRight: '6px' }} />
                  创建时间：{formatDate(item.gmtCreate)}
                </Text>
              </div>

              <div style={{ textAlign: 'right', marginTop: '8px' }}>
                <Button type="primary" size="small" onClick={() => {
                  navigate(`/admir/class/detail/${item.id}`);
                }}>
                  查看详情
                </Button>
              </div>
            </Space>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default List;