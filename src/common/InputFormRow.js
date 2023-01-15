export default function InputFormRow({
    labelName,
    name,
    value,
    handleOnChange,
    type = 'text',
    validationError,
}) {
    return (
        <article className="form-row">
            <div className="input-wrapper">
                <label>{labelName}</label>
                <input type={type} name={name} value={value || ''} onChange={handleOnChange} />
                {validationError && <p className="validation-error">{validationError}</p>}
            </div>
        </article>
    );
}
