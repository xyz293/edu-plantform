import type {TeamRanks} from '../../../type/game/index'
import {Form,Input} from 'antd'
const Store = ({teamRanks,id}:{teamRanks:TeamRanks[],id:number}) => {
    
  return (
    <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
      <Form>
         {
          teamRanks.map((item,index)=>{
            return (
              <Form.Item key={item.teamId} label={`第${index+1}组`}>
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