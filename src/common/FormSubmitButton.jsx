export default function FormSubmitButton({ disabled, text, loading }) {
    return (
        <article className="button-container">
            <button type="submit" disabled={loading} data-testid="submit-button">
                {text ? text : 'Submit'}
            </button>
        </article>
    );
}
