import './inputFormRow.scss';

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
        <article className="input-box">
            <label>{labelName}</label>
            <input className='input-container' type={type} name={name} value={value || ''} onChange={handleOnChange} data-testid={dataTestId} />
            {validationError && <p className="validation-error" data-testid={`valerror-${dataTestId}`} data-tooltip={validationError}></p>}
        </article>
    );
}
