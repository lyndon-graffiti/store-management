import { useRecoilValue } from 'recoil';
import { todoListStatusState } from '../../../store/todo';
import styles from './index.module.css';

const Status = () => {
    const todoListStatus = useRecoilValue(todoListStatusState);
    const {
        totalNum,
        totalCompletedNum,
        totalUncompletedNum,
        percentCompleted,
        unCompletedTodoListContent
    } = todoListStatus;
    return (
        <>
            <h4>项目状态</h4>
            <ul>
                <li>总项目数：{totalNum}</li>
                <li>完成项目数：{totalCompletedNum}</li>
                <li>未完成项目数：{totalUncompletedNum}</li>
                <li>完成百分比：{percentCompleted}</li>
                <li className={styles.title}>未完成项目：</li>
                {unCompletedTodoListContent.map((todo) => {
                    return <div key={todo} className={styles.item}>{todo}</div>
                })}
            </ul>
        </>
    );
}

export default Status;