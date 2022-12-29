import { useEffect, useState } from "react";
import { hostUrl } from "../../common/urls";
import FormSubmitButton from "../../common/FormSubmitButton";

export default function ChangeEmail() {
  const userId = localStorage.getItem("userId");
  const [email, setEmail] = useState("");

  const getUser = () => {
    fetch(`${hostUrl}/user/${userId}`)
      .then((resp) => resp.json())
      .then((json) => setEmail(json.email));
  };

  const updateUserEmail = () => {
    const putBody = {
      user_id: userId,
      email: email,
    };
    fetch(`${hostUrl}/user/email`, {
      method: "PATCH",
      body: JSON.stringify(putBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(getUser, [userId]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    updateUserEmail();
  };

  return (
    <div className="center">
      <h2>Change Email</h2>
      <form onSubmit={handleOnSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormSubmitButton />
      </form>
    </div>
  );
}
