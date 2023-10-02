export default function FormSubmitButton({ disabled }) {
    return (
        <button
            disabled={disabled}
            type="submit"
            className="submit_btn"
            data-testid="submit-button"
        >
            Submit
        </button>
    );
}
