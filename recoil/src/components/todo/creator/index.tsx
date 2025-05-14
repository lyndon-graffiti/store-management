import { useState } from 'react';
import { useRecoilState } from 'recoil'
import { todoListState } from '../../../store/todo'
import styles from './index.module.css'

const Creator = () => {
    const [text, setText] = useState('');
    const [errMsg, setErrMsg] = useState<string>('');
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const onClick = () => {
        if (!text) {
            setErrMsg('待办事项不能为空');
            return;
        }
        const isExist = todoList.find((todo) => todo.content === text);
        if (isExist) {
            setErrMsg('待办事项已存在');
            return;
        }
        setTodoList([
            ...todoList,
            {
                content: text,
                isCompleted: false,
                timeStamp: Date.now()
            }
        ]);
        setText('');
        setErrMsg('');
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        setErrMsg(''); // 输入框内容变化时，清空错误提示信息
    }
    return (
        <>
            <input
                type="text"
                className={styles.input}
                placeholder='请输入待办事项'
                value={text}
                onChange={onChange}
            />
            <button onClick={onClick}>新增</button>
            {errMsg && <div className={styles.err}>{errMsg}</div>}
        </>
    );
}

export default Creator;