import { useSelector , useDispatch} from "react-redux"
import { useEffect, useState } from "react";
import { effectLogin } from "../states/usario";
import useInput from "../hook/useInput"
import { sendAdress } from "../states/send";
import { useNavigate } from "react-router";

const BuyPage = function(){
    const [mesVto , setMesVto] = useState("")
    const [añoVto , setAñoVto] = useState("")
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(effectLogin())
          .then((res) => {
            console.log("1", res);
          })
          .catch((err) => console.log(err));
    }, []);
    const navigate = useNavigate()
    const send = useSelector(state=>state.send)
    const cardNumber = useInput()
    const securityKey = useInput()
    const fullName = useInput()


    const pagar = (e)=>{
        e.preventDefault()
        const envioPagado = {
            direccion : send.direccion,
            cardNumber : cardNumber.value,
            fullName : send.fullName,
            vencimiento : [mesVto , añoVto],
            email:send.email,
            telefono:send.telefono,
            dni:send.dni
        }
        dispatch(sendAdress(envioPagado))
        .then(res=>{
          console.log(res)
          navigate("/confirm")
        })
    }
    const volver = ()=>{
        navigate("/")
    }
    const mVto = (e)=>{
        setMesVto(e.target.value)
    }
    const aVto = (e)=>{
        setAñoVto(e.target.value)
    }
    return (
        <form id="login" className="container" onSubmit={pagar}>
          <div id="margen" className="field">
            <p id="borderText">
              <a id="sessionTitle">Datos de pago</a>
            </p>
          </div>
          <br />
          <div className="field">
            <p id="anchoInput" className="control has-icons-left has-icons-right">
            <input required="true" {...cardNumber} className="input" id="ccn" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="xxxx xxxx xxxx xxxx"/>
              <span className="icon is-small is-left">
              <i className="fa-solid fa-credit-card"></i>
              </span>
            </p>
          </div>
          <div className="cardContainer">
            <div className="select">
                <select onChange={mVto}>
                    <option>Mes</option>
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                </select>
            </div>
            <div className="select">
                <select onChange={aVto} required="true">
                    <option>Año</option>
                    <option>22</option>
                    <option>23</option>
                    <option>24</option>
                    <option>25</option>
                    <option>26</option>
                    <option>27</option>
                    <option>28</option>
                    <option>29</option>
                    <option>30</option>
                </select>
            </div>
            <div id="margenKey" className="field">
                <p id="anchoInput" className="control has-icons-left">
                <input
                    {...securityKey}
                    className="input"
                    type="password"
                    placeholder="CVV"
                    maxlength="3"
                    minlength="3"
                    required="true"
                />
                <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                </span>
                </p>
            </div>
        </div>
        <div id="margen" className="field">
                <p id="anchoInput" className="control has-icons-left has-icons-right">
                <input
                    {...fullName}
                    className="input"
                    type="text"
                    placeholder="Nombre completo como figura en la tarjeta"
                    required="true"
                />
                <span className="icon is-small is-left">
                    <i className="fa-solid fa-id-card"></i>
                </span>
                </p>
        </div>
          <input id="margen" type="submit" className="button is-success is-fullwidth" value="Siguinte..."/>
          <div id="margen" className="field">
            <p id="borderText" className="control">
              <a>Deseas seguir comprando?</a>
            </p>
          </div>
          <div id="margen" className="field">
            <p id="anchoInput" className="control">
              <a onClick={volver} className="button is-link is-fullwidth">
                Volver
              </a>
            </p>
          </div>
        </form>
      );
}

export default BuyPage