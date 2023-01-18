/* eslint-disable */

import { encode } from 'base-64';
import { useContext, useState } from 'react';
import { hostUrl } from '../../common/urls';
import InputFormRow from '../../common/InputFormRow';
import FormSubmitButton from '../../common/FormSubmitButton';
import { HOME_FIELDS } from '../../common/fields';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function CreateHome() {
    const [homeInfo, setHomeInfo] = useState({});
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);

    const postHome = () => {
        const formData = new FormData()
        formData.append("title", homeInfo.title)
        formData.append("city", homeInfo.city)
        formData.append("neighborhood", homeInfo.neighborhood)
        formData.append("address", homeInfo.address)
        formData.append("longitude", homeInfo.longitude)
        formData.append("latitude", homeInfo.latitude)
        formData.append("price", homeInfo.price)
        formData.append("size", homeInfo.size)
        formData.append("year", homeInfo.year)
        formData.append("description", homeInfo.description)
        if (photo) formData.append('photo', photo, photo.name);
        formData.append("owner_id", user._id)
        console.log(formData)
        console.log(homeInfo.title)
        fetch(`${hostUrl}/home`, {
            method: 'POST',
            body: formData,
            // headers: {
            //     'Content-Type': 'application/json',
            // },
        })
            .then((resp) => {
                return resp.json();
            })
            .then((json) => {
                if (json._id) {
                    navigate(`/edit-home?homeId=${json._id}`);
                    return;
                }
                throw new Error();
            });
    };

    const handleOnChange = (e) => {
        setHomeInfo({
            ...homeInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        postHome();
    };

    // function readFile(file) {
    //     return new Promise((resolve, reject) => {
    //       // Create file reader
    //       let reader = new FileReader()
      
    //       // Register event listeners
    //       reader.addEventListener("loadend", e => resolve(e.target.result))
    //       reader.addEventListener("error", reject)
      
    //       // Read file
    //       reader.readAsArrayBuffer(file)
    //     })
    //   }

    // async function getAsByteArray(file) {
    //     return new Uint8Array (await readFile(file))
    // }

    // const handleOnPhotoUpload = async (event) => {
    //     const byted = await getAsByteArray(event.target.files[0])
    //     const photoBase64FromByites = encode(byted)
    //     setPhoto(photoBase64FromByites);
    // };

    const handleOnPhotoUpload = (event) => {
        setPhoto(event.target.files[0])
    }

    return (
        <div className="center">
            <form onSubmit={handleOnSubmit}>
                <article style={{ margin: 'auto', width: '300px' }}>
                    <input type="file" name="photo" onChange={handleOnPhotoUpload} />
                </article>
                {HOME_FIELDS.map((hk) => (
                    <InputFormRow
                        key={hk.labelName}
                        labelName={hk.labelName}
                        name={hk.name}
                        value={homeInfo[hk.name]}
                        handleOnChange={handleOnChange}
                    />
                ))}
                <article className="form-row">
                    <label>Description</label>
                    <textarea
                        type="text"
                        name="description"
                        value={homeInfo.description || ''}
                        onChange={handleOnChange}
                    />
                </article>
                <FormSubmitButton />
            </form>
        </div>
    );
}
