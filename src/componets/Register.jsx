import useInput from "../hook/useInput";
import axios from "axios";
import { useNavigate } from "react-router";
const Register = () => {
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
    axios
      .post("/api/users/register", {
        nombre: firstName.value,
        apellido: lastName.value,
        documento: dni.value,
        usuario: userName.value,
        email: email.value,
        telefono: telefono.value,
        contraseña: pass.value,
      })
      .then((res) => {
        console.log(res);
        navigate("../login", { replace: true });
      })
      .catch((err) => console.log(err));
  };
  const login = () => {
    navigate("/login");
  };
  return (
    <form id="login" className="container" onSubmit={handleSubmit}>
      <h3>Register</h3>
      <br />
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input
            {...firstName}
            className="input"
            type="text"
            placeholder="Name"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input
            {...lastName}
            className="input"
            type="text"
            placeholder="Last name"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input {...dni} className="input" type="number" placeholder="DNI" />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input
            {...userName}
            className="input"
            type="text"
            placeholder="Username"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input
            {...email}
            className="input"
            type="email"
            placeholder="Email"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-left has-icons-right">
          <input
            {...telefono}
            className="input"
            type="number"
            placeholder="Phone"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          <span className="icon is-small is-right">
            <i className="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div className="field">
        <p className="control has-icons-left">
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
      <input
        id="margen"
        type="submit"
        className="button is-success is-fullwidth"
        value="Sing Up"
      />
      <div id="margen" className="field">
        <p id="borderText" className="control">
          <a>Tenés una cuenta?</a>
        </p>
      </div>
      <div id="margen" className="field">
        <p className="control">
          <button onClick={login} className="button is-link is-fullwidth">
            Sing In
          </button>
        </p>
      </div>
    </form>
  );
};

export default Register;
