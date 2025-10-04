import { Button } from 'antd';
import { useEffect, useState, useCallback } from 'react';
import { Unselected } from '../../../api/game';
import { StudentOccupy } from '../../../api/game';
import type { Unselect } from '../../../type/game/index';
import type { Occupy } from '../../../type/game/index';
import { useImperativeHandle, forwardRef } from 'react';

interface Props {
  id: number;
}

const OccupyState = forwardRef(({ id }: Props, ref) => {
  const [unselected, setUnselected] = useState<Unselect[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [occupy, setOccupy] = useState<Occupy>({
    gameId: Number(id),
    teamId: null,
    tileIds: [],
    triggerBlindBox: false,
    blindBoxTileIds: [],
    triggerGoldCenter: false,
    goldCenterTileId: 0,
    triggerChanceLand: false,
    chanceLandTileId: 0,
    challengeSuccess: false,
  });

  // 设置 ref 暴露的变量
  useImperativeHandle(ref, () => ({
    index,
    unselected,
    setOccupy,
    setUnselected,
    resetOccupy: () => {
      setOccupy(prev => ({
        ...prev,
        tileIds: [],
        triggerBlindBox: false,
        blindBoxTileIds: [],
        triggerGoldCenter: false,
        goldCenterTileId: 0,
        triggerChanceLand: false,
        chanceLandTileId: 0,
        challengeSuccess: false,
      }));
    }
  }));

  // 更新 occupy 状态
  const updateOccupy = useCallback(() => {
    const selected = unselected[index];
    if (selected && selected.teamId !== occupy.teamId) {
      setOccupy(prev => ({
        ...prev,
        teamId: selected.teamId,
        tileIds: [], // 切换队伍时清空已选择的格子
      }));
    }
  }, [unselected, index, occupy.teamId]);

  const submitOccupy = async () => {
    if (!occupy.teamId) {
      alert('请先选择队伍');
      return;
    }
    
    if (occupy.tileIds.length === 0) {
      alert('请至少选择一个格子');
      return;
    }

    const res = await StudentOccupy(occupy);
    console.log(res);

    if (res.data.code === 200) {
      alert('占用成功');
      // 更新未占用数量
      setUnselected(prev => prev.map((item, idx) => 
        idx === index 
          ? { ...item, assignCount: Math.max(0, item.assignCount - occupy.tileIds.length) }
          : item
      ));
      
      // 清空当前占用状态
      setOccupy(prev => ({
        ...prev,
        tileIds: [],
        triggerBlindBox: false,
        blindBoxTileIds: [],
        triggerGoldCenter: false,
        goldCenterTileId: 0,
        triggerChanceLand: false,
        chanceLandTileId: 0,
        challengeSuccess: false,
      }));
      
      // 如果当前队伍没有剩余格子，切换到下一队
      if (unselected[index].assignCount - occupy.tileIds.length <= 0) {
        setIndex(prev => prev + 1);
      }
    } else {
      alert('占用失败：' + (res.data.message || '未知错误'));
    }
  };

  const cancelOccupy = () => {
    setOccupy(prev => ({
      ...prev,
      tileIds: [],
      triggerBlindBox: false,
      blindBoxTileIds: [],
      triggerGoldCenter: false,
      goldCenterTileId: 0,
      triggerChanceLand: false,
      chanceLandTileId: 0,
      challengeSuccess: false,
    }));
  };

  // 初始化 unselected 数据
  useEffect(() => {
    Unselected(id).then(res => {
      console.log('未占用', res);
      setUnselected(res.data.data);
    });
  }, [id]);

  // 每次 unselected 或 index 改变时更新 occupy
  useEffect(() => {
    updateOccupy();
  }, [unselected, index, updateOccupy]);

  return (
    <div>
      <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
        <Button 
          size="large" 
          type="default" 
          onClick={cancelOccupy}
          disabled={occupy.tileIds.length === 0}
        >
          取消占用 ({occupy.tileIds.length})
        </Button>
        <Button 
          size="large" 
          type="primary" 
          onClick={submitOccupy}
          disabled={occupy.tileIds.length === 0 || !occupy.teamId}
        >
          提交占用 ({occupy.tileIds.length})
        </Button>
      </div>
    </div>
  );
});

export default OccupyState;