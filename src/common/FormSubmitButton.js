export default function FormSubmitButton(props) {
    const { disabled = false } = props;
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
