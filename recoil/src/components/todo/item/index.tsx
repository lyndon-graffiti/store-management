import cs from "classnames";
import { useSetRecoilState } from 'recoil'
import { timeFormatedTodoItem } from "../../../store/todo";
import { todoListState } from '../../../store/todo'
import styles from './index.module.css'
import { useState } from "react";

interface Props {
    todo: timeFormatedTodoItem
}

const Item = (props: Props) => {
    const { todo } = props;
    const { content, isCompleted, timeFormated } = todo;
    const setTodoList = useSetRecoilState(todoListState)
    const onChange = () => {
        setTodoList((oldTodoList) => {
            return oldTodoList.map((oldTodo) => {
                if (oldTodo.content === content) {
                    return {
                        ...oldTodo,
                        isCompleted: !oldTodo.isCompleted
                    }
                } else {
                    return oldTodo
                }
            })
        })
    }
    const onDelete = () => {
        setTodoList((oldTodoList) => {
            return oldTodoList.filter((oldTodo) => oldTodo.content !== content)
        })
    }
    const [editable, setEditable] = useState<boolean>(false)
    const [editInput, setEditInput] = useState<string>('')
    const switchToEditable = () => {
        setEditable(true)
        setEditInput(content)
    }
    const confirmEditInput = () => {
        setTodoList((oldTodoList) => {
            return oldTodoList.map((oldTodo) => {
                if (oldTodo.content === content) {
                    return {
                        ...oldTodo,
                        content: editInput,
                        timeStamp: Date.now()
                    }
                } else {
                    return oldTodo
                }
            })
        })
        setEditable(false)
    }
    return (
        <div className={styles.item}>
            {editable ? (
                <span>
                    <input
                        type="text"
                        className={styles.input}
                        value={editInput}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEditInput(e.target.value)
                        }}
                    />
                    <span className={styles.confirm} onClick={confirmEditInput}>✅</span>
                </span>
            ) : (
                <div className={styles.content}>
                    <span>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={isCompleted}
                            value={content}
                            onChange={onChange}
                        />
                        <span
                            className={cs(styles.pointer, {
                                [styles.del]: isCompleted
                            })}
                            onClick={switchToEditable}
                        >
                            {content}
                        </span>
                        <span className={styles.time}>{timeFormated}</span>
                    </span>
                    <span className={styles.close} onClick={onDelete}>X</span>
                </div>
            )}
        </div>
    );
}

export default Item;