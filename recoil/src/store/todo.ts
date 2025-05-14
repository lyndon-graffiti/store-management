import dayjs from 'dayjs'
import { atom, selector } from 'recoil'
import { FilterValue } from '../constants/todo'

export const todoListFilterState = atom<FilterValue>({
    key: 'todoListFilterState',
    default: FilterValue.All
})

/**
 * 单个待办事项的类型
 * @property content 待办事项的内容
 * @property isCompleted 待办事项是否完成
 */
interface Todo {
    content: string
    isCompleted: boolean
}

export interface TodoItem extends Todo {
    timeStamp: number
}

export const todoListState = atom<TodoItem[]>({
    key: 'todoListState',
    default: [
        {
            content: '学习Recoil',
            isCompleted: false,
            timeStamp: 1672531200000
        },
        {
            content: '学习React',
            isCompleted: true,
            timeStamp: 1672531200000
        },
        {
            content: '学习Vue',
            isCompleted: false,
            timeStamp: 1672531200000
        },
        {
            content: '学习TypeScript',
            isCompleted: false,
            timeStamp: 1672531200000
        },
        {
            content: '学习JavaScript',
            isCompleted: true,
            timeStamp: 1672531200000
        }
    ]
})

export interface timeFormatedTodoItem extends Todo {
    timeFormated: string
}

export const timeFormatedTodoListState = selector<timeFormatedTodoItem[]>({
    key: 'timeFormatedTodoListState',
    get: ({ get }) => {
        const list = get(todoListState)
        const filter = get(todoListFilterState)
        let filterList = list
        if (filter === FilterValue.Active) {
            filterList = list.filter(item => !item.isCompleted)
        }
        if (filter === FilterValue.Completed) {
            filterList = list.filter(item => item.isCompleted)
        }
        return filterList.map((item) => ({
            ...item,
            timeFormated: dayjs(item.timeStamp).format('YYYY/MM/DD HH:mm') // 修改为dayjs格式
        }))
    }
})

export const todoListStatusState = selector({
    key: 'todoListStatusState',
    get: ({ get }) => {
        const todoList = get(todoListState)
        const totalNum = todoList.length
        const totalCompletedNum = todoList.filter(item => item.isCompleted).length
        const totalUncompletedNum = totalNum - totalCompletedNum
        const percentCompleted = `${totalNum === 0 ? 0 : Math.round((totalCompletedNum / totalNum) * 100)}%`
        const unCompletedTodoListContent = todoList
            .filter(item => !item.isCompleted)
            .map((item, index) => `${index + 1}.${item.content}`)
        return {
            totalNum,
            totalCompletedNum,
            totalUncompletedNum,
            percentCompleted,
            unCompletedTodoListContent
        }
    }
})