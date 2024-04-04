import { postImage } from '../../api/photoApi';

const UploadImage = ({ onPhotoUpload }) => {
    const handleOnChange = async (e) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
            const photoData = {};
            photoData.photo_base64 = reader.result;
            const json = await postImage(photoData);
            onPhotoUpload(json);
        };
        if (e.target.files) {
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <article style={{ margin: 'auto', width: '300px' }}>
            <input data-testid="home-photo" type="file" name="photo" onChange={handleOnChange} />
        </article>
    );
};

export default UploadImage;
