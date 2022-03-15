import React from "react";
import "../styles/form.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ErrorMessage from "../commons/ErrorMessage";

import useInput from "../hook/useInput";
import { setUser, sendLogin } from "../states/usario";
import SubmitBtn from "../commons/SubmitBtn";
import Loading from "../commons/Loading";

//importar setUser de redux
const Login = function () {
  //setUser
  const [boton , setBoton] = useState(<SubmitBtn clase="button is-success is-fullwidth" valor="Sing In"/>)
  const [error , setError] = useState(<></>)
  const navigate = useNavigate();
  const email = useInput();
  const pass = useInput();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    setBoton(<Loading clase="button is-primary is-loading is-fullwidth"/>)
    dispatch(sendLogin([email, pass]))
      .then((res) => {
        if(res.payload===undefined){
          setBoton(<SubmitBtn clase="button is-success is-fullwidth" valor="Sing In"/>)
          setError(<ErrorMessage/>)
        return};
        navigate("/");
      });
  };
  const register = () => {
    navigate("/register");
  };
  return (
    <form id="login" class="container" onSubmit={handleLogin}>
      <div id="margen" class="field">
        <p id="borderText" class="control">
          <a>Login</a>
        </p>
      </div>
      <br />
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input {...email} class="input" type="email" placeholder="Email" />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </p>
      </div>
      <div id="margen" class="field">
        <p class="control has-icons-left">
          <input
            {...pass}
            class="input"
            type="password"
            placeholder="Password"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      {boton}
      {error}
      <div id="margen" class="field">
        <p id="borderText" class="control">
          <a>No estas registrado?</a>
        </p>
      </div>
      <div id="margen" class="field">
        <p class="control">
          <button onClick={register} class="button is-link is-fullwidth">
            Sing Up
          </button>
        </p>
      </div>
    </form>
  );
};
export default Login;
