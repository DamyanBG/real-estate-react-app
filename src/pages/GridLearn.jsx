import styles from './grid.module.scss'

const GridLearn = () => {
    return (
        <section className={styles.wrapper}>
            <article className={styles.box1}>One</article>
            <article className={styles.box2}>Two</article>
            <article>Three</article>
            <article>Four</article>
            <article>Five</article>
        </section>
    );
};

export default GridLearn;
