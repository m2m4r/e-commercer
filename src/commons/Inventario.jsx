import { useState } from "react"
import { addStock } from "../states/admin"
import { useDispatch } from "react-redux"

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
            cantidad:cantidad
        }
        dispatch(addStock(option))
    }
    return (
        <div class="row" key={i}>
        <div class="col-md-1"><span>{prod.marca}</span></div>
        <div class="col-md-6"><span>{prod.modelo}</span></div>
        <div class="col-md-2">
            <span>{inv.talle}</span>
        </div>
        <div class="col-md-2">
            <span>{cantidad}</span>
            <button onClick={resta} id="btn" className="button is-small">
                <i className="fa-solid fa-minus"></i>
            </button>
            <button onClick={suma} className="button is-small">
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
        <div class="col-md-1"><button onClick={guardar}>Save</button></div>
    </div>
    )
}

export default Inventario