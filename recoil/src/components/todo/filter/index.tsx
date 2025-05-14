import { useRecoilState } from 'recoil'
import { todoListFilterState } from '../../../store/todo'
import { FilterValue, TODO_FILTERS } from '../../../constants/todo'
import styles from './index.module.css'

const Filter = () => {
    const [filter, setFilter] = useRecoilState(todoListFilterState)
    const onChnage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value as FilterValue)
    }
    return (
        <select value={filter} onChange={onChnage} className={styles.container}>
            {TODO_FILTERS.map(({ name, label }) => <option value={name} key={name}>{label}</option>)}
        </select>
    );
}

export default Filter;