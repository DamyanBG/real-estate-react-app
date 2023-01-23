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
        <article className="form-row">
            <div className="input-wrapper">
                <label>{labelName}</label>
                <input type={type} name={name} value={value || ''} onChange={handleOnChange} data-testid={dataTestId} />
                {validationError && <p className="validation-error" data-testid={`valerror-${dataTestId}`}>{validationError}</p>}
            </div>
        </article>
    );
}
