import { getClass } from '../../api/class';
import { useEffect, useRef, useState } from 'react';
import type { Class } from '../../type/class/index';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Space } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import {DeleteClass} from '../../api/class'
const { Title, Text } = Typography;

const CARD_HEIGHT = 180; // 单个卡片高度

const List = ({ list, setList }: { list: Class[]; setList: (list: Class[]) => void }) => {
  const navigate = useNavigate();
  const listRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const scrollToIndex = () => {
    if (listRef.current !== null) {
      const i = Math.floor(listRef.current.scrollTop / CARD_HEIGHT);
      setIndex(i);
    }
  };

  const classItem = list.slice(index, index + Math.ceil(400 / CARD_HEIGHT));

  useEffect(() => {
    getClass(1, 50, '').then((res) => {
      if (res.data?.code === 200) {
        setList(res.data.data?.list || []);
      }
    });
  }, []);

  // 时间格式化
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
    <div style={{ padding: '24px', background: '#f7f8fa', minHeight: '100vh' }}>
      <Title level={3} style={{ marginBottom: '24px', textAlign: 'center' }}>
        班级列表
      </Title>

      <div
        onScroll={scrollToIndex}
        ref={listRef}
        style={{
          height: '400px',
          overflowY: 'auto',
          position: 'relative',
          borderRadius: '12px',
          border: '1px solid #f0f0f0',
          background: '#fff',
          padding: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        {/* 占位容器 */}
        <div style={{ height: list.length * CARD_HEIGHT + 'px', position: 'relative' }}>
          {/* 渲染可见区域 */}
          <div style={{ position: 'absolute', top: index * CARD_HEIGHT + 'px', left: '0', right: '0' }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {classItem.map((item) => (
                <Card
                  key={item.id}
                  hoverable
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'all 0.25s ease',
                  }}
                  bodyStyle={{ padding: '16px 20px' }}
                >
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <div>
                      <Text strong style={{ fontSize: '15px' }}>班级编码：</Text>
                      <Text copyable>{item.classCode}</Text>
                    </div>

                    <div>
                      <UserOutlined style={{ marginRight: '6px', color: '#1890ff' }} />
                      <Text>当前人数：{item.currentStudents}</Text>
                    </div>

                    <div>
                      <CalendarOutlined style={{ marginRight: '6px', color: '#999' }} />
                      <Text type="secondary">创建时间：{formatDate(item.gmtCreate)}</Text>
                    </div>

                    <div style={{ textAlign: 'right', marginTop: '4px' ,marginRight:'12px'}}>
                      <Button
                        type="primary"
                        size="small"
                        shape="round"
                        onClick={() => navigate(`/admir/class/detail/${item.id}`)}
                      >
                        查看详情
                      </Button>
                      <Button
                         type="primary"
                        size="small"
                        shape="round"
                        onClick={() => DeleteClass(item.id).then((res) => {
                          if (res.data?.code === 200) {
                            setList(list.filter((i) => i.id !== item.id));
                          }
                        })}
                      >
                        删除班级
                      </Button>
                    </div>
                  </Space>
                </Card>
              ))}
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
