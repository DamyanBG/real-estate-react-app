import { useContext, useState } from 'react';
import { LAND_FIELDS } from '../../common/fields';
import InputFormRow from '../../common/InputFormRow';
import FormSubmitButton from '../../common/FormSubmitButton';
import { hostUrl } from '../../utils/urls';
import { UserContext } from '../../context/UserContext';
import { validateField } from '../../common/validation';
import { toast } from 'react-toastify';
import { checkObjForProfanity } from '../../common/profanity';
import './CreateLand.scss';


export default function CreateLand() {
    const [landInfo, setLandInfo] = useState({});
    const [validationErrors, setValidationErrors] = useState(
        LAND_FIELDS.map((uf) => uf.name).reduce((acc, curr) => ((acc[curr] = ''), acc), {})
    );

    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    const postLand = () => {
        const postBody = {
            owner_id: user.id,
            ...landInfo,
        };
       

        setIsLoading(true);

        fetch(`${hostUrl}/land`, {
            method: 'POST',
            body: JSON.stringify(postBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })
            .then((resp) => {
                return resp.json();
            })
            .then((json) => {
                console.log(json, 'from create land');
                setLandInfo({});
               
            })
            .catch(() => toast.error('Creation failed!', { autoClose: 3000, pauseOnHover: false }))
            .finally(()=>{
                setIsLoading(false);
            });
    };

    const handleValidate = (e) => {
        const valError = validateField(e.target.type, e.target.value);
        if (valError) {
            setValidationErrors({
                ...validationErrors,
                [e.target.name]: valError,
            });
        } else {
            setValidationErrors((current) => {
                const copy = { ...current };
                delete copy[e.target.name];
                return copy;
            });
        }
    };

    const handleOnChange = (e) => {
        setLandInfo({
            ...landInfo,
            [e.target.name]: e.target.value,
        });
        handleValidate(e);
    };

    const handleOnPhotoUpload = (e) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setLandInfo({
            ...landInfo,
            [e.target.name]: reader.result,
          });
        };
        if (e.target.files) {
          reader.readAsDataURL(e.target.files[0]);
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(validationErrors).length > 0) {
            toast.error('Please enter valid values!', { autoClose: 3000, pauseOnHover: false });
            return;
        }
        if (checkObjForProfanity(landInfo)) return
        postLand();
    };

    return (
        <div className="center">
            <form className='create-land-form' onSubmit={handleOnSubmit}>
                {LAND_FIELDS.map((lf) => (
                    <InputFormRow
                        key={lf.labelName}
                        labelName={lf.labelName}
                        name={lf.name}
                        value={landInfo[lf.name]}
                        type={lf.type}
                        handleOnChange={handleOnChange}
                        validationError={validationErrors[lf.name]}
                        dataTestId={lf.name}
                    />
                ))}
                  <article className='create-form-image-input'>
                    <input type="file" name="photo" onChange={handleOnPhotoUpload} />
                </article>
                <FormSubmitButton disabled={isLoading} text={'Create land'}/>
            </form>
        </div>
    );
}
