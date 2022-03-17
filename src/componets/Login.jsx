import React from "react";
import "../styles/form.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useState } from "react";


import useInput from "../hook/useInput";

import { sendLogin } from "../states/usario";
import ErrorMessage from "../commons/ErrorMessage";
import SubmitBtn from "../commons/SubmitBtn";
import Loading from "../commons/Loading";


const Login = function () {
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
        return}
        if(res.payload.permiso==="user"){
          navigate("/")
        }else{
          navigate("/admin")
        };
      });
  };
  const register = () => {
    navigate("/register");
  };
  return (
    <form id="login" className="container" onSubmit={handleLogin}>
      <div id="margen" className="field">
        <p id="borderText">
          <a id="sessionTitle">Login</a>
        </p>
      </div>
      <br />
      <div className="field">
        <p id="anchoInput" className="control has-icons-left has-icons-right">
          <input {...email} className="input" type="email" placeholder="Email" />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </p>
      </div>
      <div id="margen" className="field">
        <p id="anchoInput" className="control has-icons-left">
          <input
            {...pass}
            className="input"
            type="password"
            placeholder="Password"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
        </p>
      </div>
      {boton}
      {error}
      <div id="margen" className="field">
        <p id="borderText" className="control">
          <a href="http://localhost:3001/api/users/auth/google">Iniciar sesion con Google</a>
        </p>
      </div>
      <div id="margen" className="field">
        <p id="anchoInput" className="control">
          <button onClick={register} className="button is-link is-fullwidth">
            Sing Up
          </button>
        </p>
      </div>
    </form>
  );
};
export default Login;
