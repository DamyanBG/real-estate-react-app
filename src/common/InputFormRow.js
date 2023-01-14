import { useState } from 'react';

export default function InputFormRow({ labelName, name, value, handleOnChange, type, userInfo }) {
    const [validity, setValidity] = useState(true);

    const validate = (e) => {
        let regex;
        const val = e.target.value;
        switch (name) {
            case 'email':
                regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
                setValidity(regex.test(val));
                break;
            case 'phone_number':
                regex = /^([0-9]{3,})*$/g;
                setValidity(regex.test(val));
                break;
            case 'password':
                val.length < 6 ? setValidity(false) : setValidity(true);
                break;
        }

        if (name === 'first_name' || name === 'last_name') {
            val.length < 3 || val.length > 150 ? setValidity(false) : setValidity(true);
        }
    };

    let errorMessage = `${labelName} must have minimum 3 and maximum 150 characters`;
    name === 'email' ? (errorMessage = 'Please Enter a Valid Email') : null;
    name === 'phone_number' ? (errorMessage = 'Phone number must have at least 3 digits') : null;
    name === 'passowrd' ? (errorMessage = 'Password must have at least 6 characters') : null;

    return (
        <article className="form-row">
            <div className="input-wrapper">
                <label>{labelName}</label>
                {labelName === 'Password' ? (
                    <input
                        type={type || 'text'}
                        name={name}
                        autoComplete="true"
                        value={userInfo.password || ''}
                        onChange={handleOnChange}
                        onInput={validate}
                    />
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={value || ''}
                        onChange={handleOnChange}
                        onInput={validate}
                    />
                )}
                {!validity && (
                    <p id={name + 'Error'} style={{ color: 'red', fontSize: '13px' }}>
                        {errorMessage}
                    </p>
                )}
            </div>
        </article>
    );
}
