import useInput from "../hook/useInput";
import axios from "axios";
import { useNavigate } from "react-router";
import "../styles/form.css";
import { useState } from "react";
import SubmitBtn from "../commons/SubmitBtn";
import Loading from "../commons/Loading";

import ErrorMessage from "../commons/ErrorMessage";

const Register = () => {
  const [boton , setBoton] = useState(<SubmitBtn clase="button is-success is-fullwidth" valor="Sing Up"/>)
  const [error , setError] = useState(<></>)
  const navigate = useNavigate();
  const firstName = useInput();
  const lastName = useInput();
  const dni = useInput();
  const userName = useInput();
  const email = useInput();
  const pass = useInput();
  const telefono = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();
    let userObject={
      nombre: firstName.value,
      apellido: lastName.value,
      documento: dni.value,
      usuario: userName.value,
      email: email.value,
      telefono: telefono.value,
      contraseña: pass.value,
    }
    setBoton(<Loading clase="button is-primary is-loading is-fullwidth"/>)
    axios
      .post("/api/users/register", userObject)
      .then((res) => {
        console.log(res);
        navigate("../login", { replace: true });
      })
      .catch((err) => {console.log(err)
      setBoton(<SubmitBtn clase="button is-success is-fullwidth" valor="Sing Up"/>)
      setError(<ErrorMessage/>)});
  };
  const login = () => {
    navigate("/login");
  };
  return (
    <form id="login" className="container" onSubmit={handleSubmit}>
      <div id="margen" class="field">
        <p id="borderText" class="control">
          <a id="sessionTitle" >Register</a>
        </p>
      </div>
      <br />
      <div className="field">
        <p id="anchoInput" className="control has-icons-left has-icons-right">
          <input
            {...firstName}
            className="input"
            type="text"
            placeholder="Name"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p id="anchoInput" className="control has-icons-left has-icons-right">
          <input
            {...lastName}
            className="input"
            type="text"
            placeholder="Last name"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p id="anchoInput" className="control has-icons-left has-icons-right">
          <input {...dni} className="input" type="number" placeholder="DNI" />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p id="anchoInput" className="control has-icons-left has-icons-right">
          <input
            {...userName}
            className="input"
            type="text"
            placeholder="Username"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p id="anchoInput" className="control has-icons-left has-icons-right">
          <input
            {...email}
            className="input"
            type="email"
            placeholder="Email"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p id="anchoInput" className="control has-icons-left has-icons-right">
          <input
            {...telefono}
            className="input"
            type="number"
            placeholder="Phone"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p id="anchoInput" className="control has-icons-left">
          <input
            {...pass}
            className="input"
            type="password"
            placeholder="Password"
            minlength="8"
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
          <a>Tenés una cuenta?</a>
        </p>
      </div>
      <div id="margen" className="field">
        <p id="anchoInput" className="control">
          <button onClick={login} className="button is-link is-fullwidth">
            Sing In
          </button>
        </p>
      </div>
    </form>
  );
};

export default Register;