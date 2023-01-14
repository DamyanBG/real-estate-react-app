export default function InputFormRow({ labelName, name, value, handleOnChange, handleOnBlur }) {

import { useState } from "react";

export default function InputFormRow({ labelName, name, value, handleOnChange, isValid, type}) {
    const [selected, setSelected] = useState(false);

    const handleOnInput = ()=>{
        setSelected(true);
    }

    const handleKeyUp = ()=>{
        setTimeout(() => {
          (isValid )?setSelected(false):null;
        }, 500);
    }

     let errorMessage = `${labelName} must have minimum 3 and maximum 150 characters`;
     (name === 'email')? errorMessage = 'Please Enter a Valid Email': null;
     (name === 'phone_number')? errorMessage = 'Phone number must have at least 3 digits': null;


    return (
        <article className="form-row" >
            <div className="input-wrapper">
                <label>{labelName}</label>
                <input
                    type="text"
                    name={name}
                    value={value || ''}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                />
                <input type={type} name={name} value={value || ''} onChange={handleOnChange} onInput={handleOnInput} onKeyUp={handleKeyUp}/>
                {!isValid && selected && <p style={{color: "red", fontSize: "13px"}}>
                {errorMessage} 
                </p>
                }
            </div>
        </article>
    );
}
