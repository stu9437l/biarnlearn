import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../axios";
import { AuthContext } from "../../../storage/authProvider";
import { ErrorTostify, SuccessTostify } from "../../common/tostify";

const UserLogin = () => {
  const [auth, setAuth] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const authChange = (e) => {
    const { name, value } = e.target;
    setAuth({ ...auth, [name]: value });
  };

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();
    Axios.post("users/login", auth)
      .then((res) => {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        setUser({ token, user });
        navigate("/");
        SuccessTostify("Login Successfully");
      })
      .catch((err) => {
        ErrorTostify(
          err && err.response && err.response.data && err.response.data.message
        );
        setError(
          err &&
            err.response &&
            err.response.data &&
            err.response.data.fields.email
        );
        setAuth({});
      });
  };

  return (
    <div className="container my-4">
      <h3 className="text-center mb-1 fw-bolder">Welcome Back , Get Login</h3>
      <p className="text-center terc-secondary mb-4">Free login</p>
      <div className="row">
        {/* {auth.email ? (
          " "
        ) : (
          <div class="alert alert-danger" role="alert">
            Email is required
          </div>
        )} */}

        <div className="col-6 mx-auto">
          <form action="" onSubmit={onLogin}>
            <div className="mb-3">
              <label htmlFor="" className="mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id=""
                className="form-control"
                value={auth.email}
                onChange={authChange}
              />
              {error ? <p className="text-danger">{error}</p> : ""}
            </div>
            <div className="mb-3">
              <label htmlFor="" className="mb-2">
                Password
              </label>
              <input
                type="text"
                name="password"
                id=""
                className="form-control"
                value={auth.password}
                onChange={authChange}
              />
            </div>
            <button className="btn btn-primary btn-lg w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
