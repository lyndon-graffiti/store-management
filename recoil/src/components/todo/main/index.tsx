import Creator from "../creator";
import List from "../list";
import Status from "../status";
import Filter from "../filter";
import styles from "./index.module.css";

const Main = () => {
    return (
        <>
            <h1>待办事项</h1>
            <p>这是一个熟悉 Recoil 的基础项目</p>
            <Creator />
            <div className={styles.container}>
                <div className={styles['left-area']}>
                    <List />
                    <Filter />
                </div>
                <div className={styles['right-area']}>
                    <Status />
                </div>
            </div>
        </>
    );
}

export default Main;