export default function FormSubmitButton({ disabled, text }) {
    return (
        <article className="button-container">
            <button type="submit" disabled={disabled} data-testid="submit-button">
                {text}
            </button>
        </article>
    );
}
