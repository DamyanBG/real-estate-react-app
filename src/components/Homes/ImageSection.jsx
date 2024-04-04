import UploadImage from '../common/UploadImage';

const ImageSection = ({
    homePhotoData,
    setHomePhotoData,
    setHomeLocation,
    setIsChoosingLocation,
}) => {
    const handleUploadImage = (imageData) => {
        console.log('handleUploadImage');
        const { id, photo_url } = imageData;
        const { latitude, longitude } = imageData;
        setHomePhotoData({
            id,
            photo_url,
        });
        setHomeLocation({
            latitude,
            longitude,
        });
        setIsChoosingLocation(true);
    };

    return (
        <article className="home-image">
            {homePhotoData ? (
                <img src={homePhotoData.photo_url} alt="" width="100%" />
            ) : (
                <UploadImage onPhotoUpload={handleUploadImage} />
            )}
        </article>
    );
};

export default ImageSection;
