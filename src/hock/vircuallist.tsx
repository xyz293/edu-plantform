import type { VirtualListProps } from '../type/hock/index'
const useVirtualList = <T,>({ data, itemHeight, height }: VirtualListProps<T>)=> {
    console.log(data, itemHeight, height )
   return (<div>

   </div>)
}
export default useVirtualList
