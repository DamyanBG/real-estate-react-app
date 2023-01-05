export default function InputFormRow({ labelName, name, value, handleOnChange }) {
    return (
        <article className="form-row">
            <div className="input-wrapper">
                <label>{labelName}</label>
                <input type="text" name={name} value={value || ''} onChange={handleOnChange} />
            </div>
        </article>
    );
}

