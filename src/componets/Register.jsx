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
            .post("/api/register", {
            nombre: firstName.value,
            apellido: lastName.value,
            documento: dni.value,
            usuario: userName.value,
            email: email.value,
            telefono: telefono.value,
            contraseña: pass.value
            })
            .then((res) => {console.log(res)
                navigate("../login", { replace: true });})
            .catch(err=>console.log(err))
    };
    const login = ()=>{
        navigate("/login")
    }
    return(
        <form id="login" class="container" onSubmit={handleSubmit}>
            <h3>Register</h3><br/>
            <div  class="field">
                <p class="control has-icons-left has-icons-right">
                    <input {...firstName} class="input" type="text" placeholder="Name"/>
                    <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                    </span>
                </p>
            </div>
            <div  class="field">
                <p class="control has-icons-left has-icons-right">
                    <input {...lastName} class="input" type="text" placeholder="Last name"/>
                    <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                    </span>
                </p>
            </div>
            <div  class="field">
                <p class="control has-icons-left has-icons-right">
                    <input {...dni} class="input" type="number" placeholder="DNI"/>
                    <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                    </span>
                </p>
            </div>
            <div  class="field">
                <p class="control has-icons-left has-icons-right">
                    <input {...userName} class="input" type="text" placeholder="Username"/>
                    <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                    </span>
                </p>
            </div>
            <div  class="field">
                <p class="control has-icons-left has-icons-right">
                    <input {...email} class="input" type="email" placeholder="Email"/>
                    <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                    </span>
                </p>
            </div>
            <div  class="field">
                <p class="control has-icons-left has-icons-right">
                    <input {...telefono} class="input" type="number" placeholder="Phone"/>
                    <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                    </span>
                </p>
            </div>
            <div  class="field">
                <p class="control has-icons-left">
                    <input {...pass} class="input" type="password" placeholder="Password"/>
                    <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <input id="margen" type="submit" class="button is-success is-fullwidth" value="Sing Up"/>
            <div id="margen" id="verticalCenter" class="field">
                <p id="borderText" class="control">
                    <a>Tenés una cuenta?</a>
                </p>
            </div>
            <div id="margen" class="field">
                <p class="control">
                    <button onClick={login} class="button is-link is-fullwidth">Sing In</button>
                </p>
            </div>
        </form>
    )
  };
  
  export default Register;
