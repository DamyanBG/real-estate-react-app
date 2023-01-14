export default function FormSubmitButton({ disabled }) {
    return (
        <button type="submit" className="submit_btn" disabled={disabled}>
            Submit
        </button>
    );
}
