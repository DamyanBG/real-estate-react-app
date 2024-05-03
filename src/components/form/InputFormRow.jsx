import styles from './ifr.module.scss'

export default function InputFormRow({
    labelName,
    name,
    value,
    handleOnChange,
    type = 'text',
    validationError,
    dataTestId,
}) {
    return (
        <article className={styles.inputBox}>
            <label>{labelName}</label>
            <input type={type} name={name} value={value || ''} onChange={handleOnChange} data-testid={dataTestId} />
            {validationError && <p className={styles.validationError} data-testid={`valerror-${dataTestId}`} data-tooltip={validationError}></p>}
        </article>
    );
}
