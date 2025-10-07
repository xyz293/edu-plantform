import type {TeamRanks} from '../../../type/game/index'
import {Form,Input} from 'antd'
const Store = ({teamRanks,id}:{teamRanks:TeamRanks[],id:number}) => {
    const list = teamRanks.filter((item)=>item.status === 1)
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
      <Form>
         {
          list.map((item,index)=>{
            return (
              <Form.Item key={item.teamId} label={<h2>第{index+1}组</h2>}>
                <Input />
              </Form.Item>
            )
          })
        }
      </Form>
    </div>
  )
};
export default Store