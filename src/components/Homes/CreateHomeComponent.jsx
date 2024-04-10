import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_FIELDS } from '../../common/fields';
import { validateField } from '../../common/validation';
import { checkObjForProfanity } from '../../common/profanity';
import usePostHome from './usePostHome';
import { useMapEvents } from 'react-leaflet/hooks';
import ImageSection from './ImageSection';
import HomeForm from './HomeForm';
import CreateHomeMap from './CreateHomeMap';
import Spinner from '../../common/Spinner';

function MapClickHandlerComponent({ onLocationChoose }) {
    const map = useMapEvents({
        click: (e) => {
            map.locate();
            onLocationChoose(e.latlng);
        },
    });
    return null;
}

export default function CreateHomeComponent() {
    const [homeInfo, setHomeInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState(
        HOME_FIELDS.map((uf) => uf.name).reduce((acc, curr) => ((acc[curr] = ''), acc), {
            description: '',
        })
    );
    const [homePhotoData, setHomePhotoData] = useState(null);
    const [homeLocation, setHomeLocation] = useState({});
    const [isChoosingLocation, setIsChoosingLocation] = useState(false);

    const postHomeAction = usePostHome();
    const navigate = useNavigate();

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
        setHomeInfo({
            ...homeInfo,
            [e.target.name]: e.target.value,
        });
        handleValidate(e);
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (Object.keys(validationErrors).length > 0 || !homePhotoData) {
            import('react-toastify').then((module) =>
                module.toast.error('Please enter valid values!', {
                    autoClose: 3000,
                    pauseOnHover: false,
                })
            );
            setLoading(false);
            return;
        }
        if (checkObjForProfanity(homeInfo)) {
            import('react-toastify').then((module) =>
                module.toast.error('Please do not use bad words!', {
                    autoClose: 3000,
                    pauseOnHover: false,
                })
            );
            setLoading(false);
            return;
        }
        let addHomeData;
       
        try {
            const postHomeData = {
                ...homeInfo,
                photo_id: homePhotoData.id,
                latitude: homeLocation.latitude,
                longitude: homeLocation.longitude,
            };
            addHomeData = await postHomeAction(postHomeData);
           
            navigate(`/edit-home?homeId=${addHomeData.id}`);
        } catch (error) {
            import('react-toastify').then((module) =>
                module.toast.error('Server error', {
                    autoClose: 3000,
                    pauseOnHover: false,
                })
            );
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSetLocation = (location) => {
        const newLocation = {
            latitude: location.lat.toString(),
            longitude: location.lng.toString(),
        };
        setHomeLocation(newLocation);
    };

    const theComponentClick = <MapClickHandlerComponent onLocationChoose={handleSetLocation} />;

    if (loading) {
        return <Spinner />;
    }

    return (
        <section className="create-home-container">
            <section className="home-image-form-row">
                <ImageSection
                    homePhotoData={homePhotoData}
                    setHomePhotoData={setHomePhotoData}
                    setHomeLocation={setHomeLocation}
                    setIsChoosingLocation={setIsChoosingLocation}
                />
                <HomeForm
                    homeInfo={homeInfo}
                    handleOnChange={handleOnChange}
                    handleOnSubmit={handleOnSubmit}
                    validationErrors={validationErrors}
                    loading={loading}
                />
            </section>

            <CreateHomeMap
                isChoosingLocation={isChoosingLocation}
                setIsChoosingLocation={setIsChoosingLocation}
                homeLocation={homeLocation}
                theComponentClick={theComponentClick}
            />
        </section>
    );
}
