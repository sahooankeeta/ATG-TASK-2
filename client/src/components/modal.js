import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import illustration from "./../images/atg_illustrationsign-in.png";
import { useHistory } from "react-router-dom";
import { signin, signup, changePassword } from "../actions";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Modal = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const dispatch = useDispatch();

  const history = useHistory();

  // console.log(history);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const error = useSelector((state) => state.error);

  const isLoading = useSelector((state) => state.isLoading);
  const user = useSelector((state) => state.profile);
  //console.log(user);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setIsForgetPassword(false);
    setShowPassword(false);
  };
  const forgetPassword = () => {
    setForm(initialState);
    setIsForgetPassword((prevIsForgetPassword) => !prevIsForgetPassword);
    setShowPassword(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
    if (isForgetPassword) {
      dispatch(changePassword(form));
      setForm(initialState);
      setIsSignup(false);
      setIsForgetPassword(false);
    } else {
      if (isSignup) {
        dispatch(signup(form, history));
      } else {
        dispatch(signin(form, history));
      }
    }

    setForm(initialState);
  };

  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-view-big">
        <div
          class="modal-content"
          style={{ position: "relative", margin: "0 auto" }}
        >
          <div>
            <h3
              style={{
                color: "#008A45",
                padding: "15px 10px",
                fontWeight: "500",
                fontSize: "18px",
                textAlign: "center",
                background: "#EFFFF4",
                borderRadius: "8px 8px 0px 0px",
                lineHeight: "16px",
              }}
            >
              {user?.result == null
                ? "Let's learn, share & inspire each other with our passion for computer engineering. Sign up now 🤘🏼"
                : "you have logged in"}
            </h3>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{
                position: "absolute",
                right: "0",
                top: "-35px",
                padding: "0",
                color: "white",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-x-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
              </svg>
            </button>
          </div>
          {user?.result == null && (
            <div
              class="modal-body"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ width: "50%", padding: "0 15px" }}>
                <h2
                  style={{
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: "31px",
                  }}
                >
                  {isForgetPassword
                    ? "Change password"
                    : isSignup
                    ? "Create Account"
                    : "Sign In"}
                </h2>
                <form onSubmit={handleSubmit}>
                  {error && <div>{error}</div>}
                  {isSignup && (
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          background: "#F7F8FA",
                          width: "50%",
                          border: "1px solid #D9D9DB",
                        }}
                      >
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          onChange={handleChange}
                          value={form.firstName}
                          required
                        />
                      </div>
                      <div
                        style={{
                          width: "50%",
                          background: "#F7F8FA",
                          border: "1px solid #D9D9DB",
                        }}
                      >
                        <input
                          type="text"
                          onChange={handleChange}
                          name="lastName"
                          value={form.lastName}
                          placeholder="Last Name"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div
                    style={{
                      background: "#F7F8FA",
                      border: "1px solid #D9D9DB",
                    }}
                  >
                    <input
                      name="email"
                      type="email"
                      onChange={handleChange}
                      value={form.email}
                      placeholder="Email"
                      aria-describedby="emailHelp"
                      required
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0 10px 0 0",
                      background: "#F7F8FA",
                      border: "1px solid #D9D9DB",
                    }}
                  >
                    <input
                      name="password"
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={form.password}
                      required
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-eye"
                      viewBox="0 0 16 16"
                      onClick={handleShowPassword}
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  </div>
                  {(isSignup || isForgetPassword) && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",

                        background: "#F7F8FA",
                        border: "1px solid #D9D9DB",
                      }}
                    >
                      <input
                        name="confirmPassword"
                        onChange={handleChange}
                        type="password"
                        value={form.confirmPassword}
                        placeholder="Confirm Password"
                        required
                      />
                    </div>
                  )}
                  <button
                    type="submit"
                    class="btn btn-primary"
                    style={{
                      width: "100%",
                      borderRadius: "20px",
                      margin: "15px 0",
                    }}
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isForgetPassword
                      ? "Set Password"
                      : isSignup
                      ? "Create Account"
                      : "Sign In"}
                  </button>
                </form>
                <button
                  type="button"
                  class="btn btn-light"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "0.6px solid #D9D9DB",
                    borderRadius: "2px",
                    width: "100%",
                    marginBottom: "15px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                    style={{ fill: "#000000" }}
                  >
                    <path
                      fill="#039be5"
                      d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                    ></path>
                  </svg>
                  <span style={{ marginLeft: "10px" }}>
                    Sign {isSignup ? "Up" : "In"} with Facebook
                  </span>
                </button>
                <button
                  type="button"
                  class="btn btn-light"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "0.6px solid #D9D9DB",
                    borderRadius: "2px",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="35"
                    height="35"
                    viewBox="0 0 48 48"
                    style={{ fill: "#000000" }}
                  >
                    <path
                      fill="#fbc02d"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#e53935"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4caf50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1565c0"
                      d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  <span style={{ marginLeft: "10px" }}>
                    Sign {isSignup ? "Up" : "In"} with Google
                  </span>
                </button>
                {!isSignup && (
                  <button
                    type="button"
                    class="btn btn-light"
                    onClick={forgetPassword}
                    disabled={isLoading}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "0.6px solid #D9D9DB",
                      borderRadius: "2px",
                      width: "100%",
                    }}
                  >
                    {isForgetPassword ? "SignIn" : "Forgot Password?"}
                  </button>
                )}
              </div>
              <div style={{ width: "45%" }}>
                <h3
                  style={{
                    fontWeight: "400",
                    fontSize: "17px",
                    lineHeight: "17px",
                  }}
                >
                  {isSignup
                    ? "Already have an account?"
                    : " Don’t have an account yet?"}

                  <span
                    onClick={switchMode}
                    style={{ color: "#2F6CE5", cursor: "pointer" }}
                  >
                    {isSignup ? "Sign In" : "Create new for free!"}
                  </span>
                </h3>
                <img src={illustration} alt="" />
              </div>
            </div>
          )}
        </div>
      </div>
      {user?.result == null ? (
        <div class="modal-dialog modal-view-small ">
          <div class="modal-content" style={{ position: "fixed", bottom: "0" }}>
            <div class="modal-body">
              <div style={{ padding: "0 15px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2
                    style={{
                      fontWeight: "700",
                      fontSize: "24px",
                      lineHeight: "31px",
                      display: "inline",
                    }}
                  >
                    {isForgetPassword
                      ? "Change password"
                      : isSignup
                      ? "Create Account"
                      : "Sign In"}
                  </h2>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <form>
                  {error && <div>{error}</div>}
                  {isSignup && (
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0 10px",
                          background: "#F7F8FA",
                          width: "50%",
                          border: "1px solid #D9D9DB",
                        }}
                      >
                        <input
                          type="text"
                          onChange={handleChange}
                          value={form.firstName}
                          placeholder="First Name"
                          required
                          name="firstName"
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0 10px",
                          width: "50%",
                          background: "#F7F8FA",
                          border: "1px solid #D9D9DB",
                        }}
                      >
                        <input
                          type="text"
                          name="lastName"
                          onChange={handleChange}
                          value={form.lastName}
                          placeholder="Last Name"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0 10px",
                      background: "#F7F8FA",
                      border: "1px solid #D9D9DB",
                    }}
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      value={form.email}
                      aria-describedby="emailHelp"
                      required
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0 10px",
                      background: "#F7F8FA",
                      border: "1px solid #D9D9DB",
                    }}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      onChange={handleChange}
                      value={form.password}
                      name="password"
                      placeholder="Password"
                      required
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-eye"
                      viewBox="0 0 16 16"
                      onClick={handleShowPassword}
                    >
                      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                    </svg>
                  </div>
                  {(isSignup || isForgetPassword) && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 10px",
                        background: "#F7F8FA",
                        border: "1px solid #D9D9DB",
                      }}
                    >
                      <input
                        type="password"
                        onChange={handleChange}
                        value={form.confirmPassword}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                      />
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      type="submit"
                      class="btn btn-primary"
                      style={{
                        borderRadius: "20px",
                        margin: "15px 0",
                      }}
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      {isForgetPassword
                        ? "Set Password"
                        : isSignup
                        ? "Create Account"
                        : "Sign In"}
                    </button>
                    <span
                      onClick={switchMode}
                      style={{
                        fontWeight: "500",
                        fontSize: "15px",
                        lineHeight: "17px",
                        cursor: "pointer",
                        textAlign: "right",
                        textDecorationLine: "underline",

                        color: "#495057",
                      }}
                    >
                      {isSignup ? "or, Sign In" : "or, Create Account"}
                    </span>
                  </div>
                </form>
                <button
                  type="button"
                  class="btn btn-light"
                  disabled={isLoading}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "0.6px solid #D9D9DB",
                    borderRadius: "2px",
                    width: "100%",
                    marginBottom: "15px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                    style={{ fill: "#000000" }}
                  >
                    <path
                      fill="#039be5"
                      d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                    ></path>
                  </svg>
                  <span style={{ marginLeft: "10px" }}>
                    Sign {isSignup ? "Up" : "In"} with Facebook
                  </span>
                </button>
                <button
                  type="button"
                  class="btn btn-light"
                  disabled={isLoading}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "0.6px solid #D9D9DB",
                    borderRadius: "2px",
                    width: "100%",
                    marginBottom: "15px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="35"
                    height="35"
                    viewBox="0 0 48 48"
                    style={{ fill: "#000000" }}
                  >
                    <path
                      fill="#fbc02d"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#e53935"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4caf50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1565c0"
                      d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  <span style={{ marginLeft: "10px" }}>
                    Sign {isSignup ? "Up" : "In"} with Google
                  </span>
                </button>
                {isSignup ? (
                  <h4 style={{ textAlign: "center", fontSize: "14px" }}>
                    By signing up, you agree to our Terms & conditions, Privacy
                    policy
                  </h4>
                ) : (
                  <button
                    type="button"
                    class="btn btn-light"
                    onClick={forgetPassword}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "0.6px solid #D9D9DB",
                      borderRadius: "2px",
                      width: "100%",
                    }}
                  >
                    {isForgetPassword ? "SignIn" : "Forgot Password?"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div class="modal-dialog modal-dialog-centered modal-view-small ">
          <div class="modal-content">
            <div
              class="modal-content"
              style={{ position: "relative", margin: "0 auto" }}
            >
              <div>
                <h3
                  style={{
                    color: "#008A45",
                    padding: "15px 10px",
                    fontWeight: "500",
                    fontSize: "18px",
                    textAlign: "center",
                    background: "#EFFFF4",
                    borderRadius: "8px 8px 0px 0px",
                    lineHeight: "16px",
                  }}
                >
                  you have logged in
                </h3>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{
                    position: "absolute",
                    right: "0",
                    top: "-35px",
                    padding: "0",
                    color: "white",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-x-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Modal;
