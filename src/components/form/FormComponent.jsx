import styles from "./form.module.scss"

const FormComponent = ({
    handleOnSubmit,
    dataTestId,
    formFields,
    checkboxComponent,
    submitButton,
    formHeaderText
}) => {
    return (
        <form onSubmit={handleOnSubmit} data-testid={dataTestId}>
            <h2>{formHeaderText}</h2>
            <article className={styles.content}>
                {formFields}
            </article>

            {checkboxComponent}
            {submitButton}
        </form>
    )
}

export default FormComponent;