import { useState, useRef  } from 'react';
import { postImage } from '../../api/photoApi';
import Spinner from '../../common/Spinner';
import './UploadImage.scss';

const UploadImage = ({ onPhotoUpload }) => {
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('No file chosen, yet.');

    const realFile = useRef();

    const handleOnChange = async (e) => {
        const file = event.target.files[0];
        // Update the state with the file name, or a default string if no file is selected
        setFileName(file ? file.name : 'No file chosen, yet.');

        const reader = new FileReader();
        reader.onloadend = async () => {
            const photoData = {};
            photoData.photo_base64 = reader.result;
            try {
                // Set loading
                setLoading(true);
                const json = await postImage(photoData);
                onPhotoUpload(json);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        if (e.target.files) {
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleClick = () => {
        realFile.current.click();
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <section className='input-image-wrapper home-form-section'>
           <article className='image-container'>
            <input
                    data-testid="home-photo"
                    type="file"
                    id="real-file"
                    ref={realFile}
                    hidden="hidden"
                    name="photo"
                    onChange={handleOnChange}
                />
                <button className='button-file' type="button" onClick={handleClick}>
                    Upload a File
                </button>
                <span className='real-file-span'>{fileName}</span>
           </article>
        </section>
    );
};

export default UploadImage;
