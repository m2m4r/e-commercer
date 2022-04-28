import { useState } from "react"
import { addStock } from "../states/admin"
import { useDispatch } from "react-redux"
import "../styles/form.css";

const Inventario = function ({prod , inv , i}){
    const [cantidad , setCantidad] = useState(Number(inv.stock))
    const dispatch = useDispatch()
    const resta = ()=>{
        setCantidad(cantidad-1)
    }
    const suma = ()=>{
        setCantidad(cantidad+1)
    }
    const guardar = ()=>{
        const option = {
            id:prod.id,
            talle:inv.talle,
            stock:cantidad
        }
        dispatch(addStock(option))
    }
    return (
        <div className="row" key={i}>
        <div className="col-md-1"><span>{prod.marca}</span></div>
        <div className="col-md-6"><span>{prod.modelo}</span></div>
        <div className="col-md-2">
            <span>{inv.talle}</span>
        </div>
        <div className="col-md-2">
            <span>{cantidad}</span>
            <button onClick={resta} id="btn" classNameName="button is-small">
                <i classNameName="fa-solid fa-minus">-</i>
            </button>
            <button onClick={suma} classNameName="button is-small">
                <i classNameName="fa-solid fa-plus">+</i>
            </button>
        </div>
        <div className="col-md-1"><button onClick={guardar}>Save</button></div>
    </div>
    )
}

export default Inventario