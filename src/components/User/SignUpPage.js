import { USER_FIELDS } from '../../common/fields';
import { ROLES_ENUM } from '../../common/enums';
import { useState } from 'react';
import InputFormRow from '../../common/InputFormRow';
import { hostUrl } from '../../common/urls';
import FormSubmitButton from '../../common/FormSubmitButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';




export default function SignUpPage() {
    const [roles, setRoles] = useState([]);
    const [CheckedValue, setCheckedValue] = useState();
    const [userInfo, setUserInfo] = useState(
        ''
    );
    

    const navigate = useNavigate();

    const postHome = async () => {
        try {
            const data = await fetch(`${hostUrl}/user`, {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (data) {
                navigate('/');
                toast.success('Successful Sign up!', { autoClose: 300, pauseOnHover: false });
            }
        } catch (err) {
            toast.error(`Something went wrong! ${err}`, { autoClose: 300, pauseOnHover: false });
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        postHome();
        
    };

    const handleOnChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };
    console.log(userInfo)

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
          setCheckedValue(e.target.value);
          if (!roles.includes(e.target.value)) {
            setRoles({...roles, [e.target.name]: e.target.value});
            
          }
        } 
      };
      console.log(roles)
    return (
        <div className="center">
            <form onSubmit={handleOnSubmit}>
                {USER_FIELDS.map((uf) => (
                    <InputFormRow
                        key={uf.labelName}
                        labelName={uf.labelName}
                        name={uf.name}
                        value={userInfo[uf.name]}
                        handleOnChange={handleOnChange}
                    />
                ))}
                <article className="form-row">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={userInfo.password || ''}
                        onChange={handleOnChange}
                    />
                </article>
                <article className="form-row">
                    <label>Sign Up As</label>
                <ul className="flex items-center gap-1">
                    {ROLES_ENUM.map((role, index) => (
                    <li key={index}>
                        <input
                        type="checkbox"
                        id={role.value}
                        name="roles"
                        value={role.value}
                        checked={role.value === CheckedValue}
                        onChange={handleCheckboxChange}
                        />
                        <label htmlFor={role.value} className="text-sm ml-1">
                        {role.label}
                        </label>
                    </li>
                    ))}
                </ul>     
                </article>
                <FormSubmitButton />
            </form>
            
        </div>
    );
}