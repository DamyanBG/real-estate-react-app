import { useContext, useState } from 'react';
import { LAND_FIELDS } from '../../common/fields';
import InputFormRow from '../../common/InputFormRow';
import FormSubmitButton from '../../common/FormSubmitButton';
import { hostUrl } from '../../common/urls';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import {checkEmptyFields} from '../functions/checkEmptyField'
import { checkCharLength } from '../functions/checkCharLength'

export default function CreateLand() {
    const [landInfo, setLandInfo] = useState({name: '', place: '', price: '', size: '', description: '', longitude: '',latitude: ''});

    const { user } = useContext(UserContext);

    const postLand = async () => {
        
        const {name, place, price, size, description, longitude, latitude} = landInfo

        const postBody = {
            owner: user._id,
            ...landInfo,
        };

        if(!name || !place || !price || !size || !description || !longitude || !latitude) {

            checkEmptyFields(name, place, price, size, description, longitude, latitude)

            return
        }

        if(name && name.length < 3 || name.length > 150 || price && price.length > 50 || place && place.length < 3 || place.length > 150 || size && size.length < 3 || size.length > 150 || description && description.length < 5 || description.length > 150 || longitude && longitude.length < 3 || longitude.length > 100 || latitude && latitude.length < 3 || latitude.length > 100) {

            checkCharLength(name, place, price, size, description, longitude, latitude)

            return
        }

        if(!Number.isInteger(parseInt(price))) {
            toast.error('Price must be an integer')
            return
        }


        fetch(`${hostUrl}/land`, {
            method: 'POST',
            body: JSON.stringify(postBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => {
                console.log(resp);
                return resp.json();
            })
            .then((json) => {
                console.log(json);
                setLandInfo({});
            });
    };

    const handleOnChange = (e) => {
        setLandInfo({
            ...landInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        postLand();
    };

    return (
        <div className="center">
            <form onSubmit={handleOnSubmit}>
                {LAND_FIELDS.map((lf) => (
                    <InputFormRow
                        key={lf.labelName}
                        labelName={lf.labelName}
                        name={lf.name}
                        value={landInfo[lf.name]}
                        handleOnChange={handleOnChange}
                    />
                ))}
                <FormSubmitButton />
            </form>
        </div>
    );
}
