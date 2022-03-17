import useInput from "../hook/useInput";
import { useNavigate } from "react-router";
import "../styles/form.css";
import { useState } from "react";
import axios from "axios";
const SendForm = ({user}) => {
    const [data , setData] = useState(user)
    const [edit , setEdit] = useState(true)
    const [btn , setBtn] = useState("fa-solid fa-unlock")
    const [check , setCheck] = useState(false)
    const navigate = useNavigate();
    const name = useInput(`${data.nombre} ${data.apellido}`);
    const direccion = useInput(data.direccion);
    const dni = useInput(data.documento);
    const email = useInput(data.email);
    const telefono = useInput(data.telefono);
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!direccion.value){editar(); return}
        if(check){
            axios
            .put('/api/users/edit' , {direccion:direccion.value})
            .then(res=>{
                setData(res.data)
                navigate("/buy")})
            .catch(err=>console.log(err))
        }
    };
    const comprando = () => {
      navigate("/");
    };
    const editar = () => {
        btn=="fa-solid fa-unlock"?setBtn("fa-solid fa-lock"):setBtn("fa-solid fa-unlock")
        edit==true?setEdit(false):setEdit(true)
      };
    const save = () => {
        check==false?setCheck(true):setCheck(false)
    };  
    return (
      <form id="login" className="container" onSubmit={handleSubmit}>
        <div id="margen" class="field">
          <p id="borderText" class="control">
            <a id="sessionTitle" >Datos de envío</a>
          </p>
        </div>
        <br />
        <div className="field">
          <p id="anchoInput" className="control has-icons-left has-icons-right">
            <input
              {...name}
              className="input"
              type="text"
              placeholder="Nombre"
              required="true"
              disabled={edit}
            />
            <span className="icon is-small is-left">
              <i class="fa-solid fa-user"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p id="anchoInput" className="control has-icons-left has-icons-right">
            <input
              {...direccion}
              className="input"
              type="text"
              placeholder="Dirección"
              required="true"
              disabled={edit}
            />
            <span className="icon is-small is-left">
            <i class="fa-solid fa-address-card"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p id="anchoInput" className="control has-icons-left has-icons-right">
            <input {...dni} className="input" type="number" placeholder="DNI" required="true" disabled={edit}/>
            <span className="icon is-small is-left">
              <i class="fa-solid fa-id-card"></i>
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
              required="true"
              disabled={edit}
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
              required="true"
              disabled={edit}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div id="verifyContainer">
            <a onClick={()=>editar()} id="btn" className="button is-small"><i className={btn}></i></a>
            <label className="checkbox">
            <input onClick={save} checked={check} type="checkbox" disabled={edit}/>Guardar como dirección predeterminada?
            </label>
        </div>

        <input id="margen" type="submit" className="button is-success is-fullwidth" value="Siguinte..."/>
        <div id="margen" className="field">
          <p id="borderText" className="control">
          </p>
        </div>
        <div id="margen" className="field">
          <p id="anchoInput" className="control">
            <button onClick={comprando} className="button is-link is-fullwidth">
              Continuar comprando...
            </button>
          </p>
        </div>
      </form>
    );
  };
  
  export default SendForm;