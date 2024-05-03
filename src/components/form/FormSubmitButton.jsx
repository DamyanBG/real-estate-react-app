import styles from './submit-button.module.scss'

export default function FormSubmitButton({ disabled , text }) {
    const buttonText = text || 'Submit'

    return (
        <article className={styles.buttonContainer}>
            <button type="submit" disabled={disabled} data-testid="submit-button">
                {buttonText}
            </button>
        </article>
    );
}
