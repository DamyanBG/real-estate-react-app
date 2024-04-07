export default function FormSubmitButton({ disabled, text, loading, isLoading }) {
    return (
        <article className="button-container">
            <button type="submit" disabled={loading ? loading : isLoading ? isLoading : disabled ? disabled : ''} data-testid="submit-button">
                {text ? text : 'Submit'}
            </button>
        </article>
    );
}
