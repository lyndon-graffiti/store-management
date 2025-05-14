import { useRecoilValue } from 'recoil'
import { timeFormatedTodoListState } from '../../../store/todo'
import Item from '../item'

const List = () => {
    const timeFormatedTodoList = useRecoilValue(timeFormatedTodoListState);
    console.log(timeFormatedTodoList)
    return (
        <>
            <h4>项目列表</h4>
            {timeFormatedTodoList.map((todo) => {
                return <Item todo={todo} key={todo.content} />
            })}
        </>
    )
}

export default List