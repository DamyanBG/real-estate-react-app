import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hostUrl } from "../../common/urls";
import { UserContext } from "../../context/UserContext";

export default function SignUpPage() {
  const [errorMessage, seterrorMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)

  const loginHandler = async (e) => {
    e.preventDefault();
    setisLoading(true);

    //get credentials
    const email = e.target.email.value;
    const password = e.target.password.value;

    //configure post request
    const url = hostUrl + "/auth/login";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestBody = JSON.stringify({
      email: email,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: requestBody
    };

    //send post request
    const response = await fetch(url, requestOptions);
    setisLoading(false);
    const detail = await response.json();
    const status = response.status;

    //handle various scenerios
    if (status === 200) {
      document.cookie = `token=${detail.token};max-age=${60 * 60 * 24}`;
      localStorage.setItem("userId", detail._id);
      setUser(detail._id)
      navigate("/");
    } else if (status === 400) {
      seterrorMessage("Wrong email or password");
      document.getElementById("email").focus();
    } else if (status === 401) {
      seterrorMessage("Wrong email or password");
      document.getElementById("email").focus();
    } else {
      seterrorMessage("Error occured while trying to sign in.");
      document.getElementById("email").focus();
    }
  };

  return (
    <div className="signin-form-container center">
      <form className="signin-form" onSubmit={loginHandler} onClick={() => seterrorMessage(null)}>
        <h3>Sign In</h3>
        <div className="input-wrapper">
          <label htmlFor="email">Email:</label>
          <input placeholder="enter email" type="email" id="email" required autoComplete="email" />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">Password:</label>
          <input type="password" placeholder="enter password" id="password" autoComplete="current-password" required />
        </div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          {!isLoading ? <input className="submit_btn" type="submit" value="Sign in" /> : <input className="submit_btn" type="submit" value="Signin in..." />}
      </form>
    </div>
  );
}
