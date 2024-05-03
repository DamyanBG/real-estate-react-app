import styles from "./form-checkbox.module.scss"

const FormCheckbox = ({ onCheckboxChange, dataTestId, text }) => {
    return (
        <article className={styles.alert}>
            <input
                data-testid={dataTestId}
                type="checkbox"
                onChange={onCheckboxChange}
            />
            <p>{text}</p>
        </article>
    );
};

export default FormCheckbox;
