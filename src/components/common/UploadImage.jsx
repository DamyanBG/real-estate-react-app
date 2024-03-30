import axios from "axios";
import { hostUrl } from "../../utils/urls";

const UploadImage = () => {
    const handleOnPhotoUpload = async (e) => {
        console.log("changed")
        const reader = new FileReader();
        reader.onloadend = async () => {
            const photoData = {}
            photoData.photo_base64 = reader.result
            console.log(photoData)
            const resp = await fetch(`${hostUrl}/temp-photo`, {
                method: "POST",
                body: JSON.stringify(photoData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const json = await resp.json()
            console.log(json)
        };
        if (e.target.files) {
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    return (
        <article style={{ margin: 'auto', width: '300px' }}>
            <input
                data-testid="home-photo"
                type="file"
                name="photo"
                onChange={handleOnPhotoUpload}
            />
        </article>
    )
}

export default UploadImage