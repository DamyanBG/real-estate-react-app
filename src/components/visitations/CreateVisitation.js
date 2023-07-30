import FormSubmitButton from "common/FormSubmitButton";
import InputFormRow from "common/InputFormRow";
import { VISITATION_FIELDS } from "common/fields";
import { hostUrl } from "utils/urls";
import { UserContext } from "context/UserContext";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { checkObjForProfanity } from "common/profanity";

export default function CreateVisitation() {
    const params = new URLSearchParams(window.location.search)
    const landId = params.get('landId');
    const homeId = params.get('homeId');
    const [visitationInfo, setVisitationInfo] = useState({})

    const { user } = useContext(UserContext)
    const navigate = useNavigate()
 
    const handleOnChange = (e) => {
        setVisitationInfo({
            ...visitationInfo,
            [e.target.name]: e.target.value,
        });
    };

    const postVisitation = () => {
        const postBody = {
            ...visitationInfo,
            organizator_id: user.id,
            home_id: homeId,
            land_id: landId,
        }
        fetch(`${hostUrl}/visitation`, {
            method: "POST",
            body: JSON.stringify(postBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })
            .then(resp => {
                if (resp.status === 201) {
                    navigate(`/${homeId ? "home" : "land"}-details?${homeId ? "home" : "land"}Id=${landId || homeId}`)
                    return
                }
                throw new Error()
            })
            .catch(() => alert("Something went wrong!"))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (checkObjForProfanity(visitationInfo)) return
        postVisitation()
    }   

    return (
        <div className="center">
            <form onSubmit={handleOnSubmit}>
                {VISITATION_FIELDS.map((vf) => (
                    <InputFormRow
                        key={vf.name}
                        labelName={vf.labelName}
                        name={vf.name}
                        value={visitationInfo[vf.name]}
                        handleOnChange={handleOnChange}
                        type={vf.type}
                        dataTestId={vf.name}
                    />
                ))}
                <FormSubmitButton />
            </form>
        </div>
    )
}