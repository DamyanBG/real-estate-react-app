import { useContext, useEffect, useState } from 'react';
import { LAND_FIELDS } from '../../common/fields';
import { hostUrl } from '../../utils/urls';
import { UserContext } from '../../context/UserContext';
import InputFormRow from '../../common/InputFormRow';
import './EditLand.scss';
import { checkTextForProfanity } from '@/common/profanity';
import { useLocation  } from 'react-router-dom';

const EditLand = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const landId = params.get('landId');
    const [landInfo, setLandInfo] = useState({});
    const { user } = useContext(UserContext);

    const getLandInfo = () => {
        fetch(`${hostUrl}/land/${landId}`)
            .then((res) => res.json())
            .then(setLandInfo);
    };

    useEffect(() => {
        if (!landId) return;
        getLandInfo();
    }, [landId]);

    const updateLand = () => {
        const landBody = { owner_id: user, land_id: landId, ...landInfo };
        fetch(`${hostUrl}/land`, {
            method: 'PUT',
            body: JSON.stringify(landBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setLandInfo(json);
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
        if (checkTextForProfanity(landInfo)) return
        updateLand();
    };

    return (
        <div className="center">
        <form onSubmit={handleOnSubmit}>
            {LAND_FIELDS.map((ev) => (
                <InputFormRow
                    key={ev.labelName}
                    labelName={ev.labelName}
                    name={ev.name}
                    value={landInfo[ev.name]}
                    handleOnChange={handleOnChange}
                />
            ))}
            <button className='button-edit'>Submit</button>
        </form>
    </div>
    );
};

export default EditLand;
