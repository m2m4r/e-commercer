import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { inventarioTalle } from "../states/inventario"

const AdminRow = function({producto}){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accessoInventario = ()=>{
        dispatch(inventarioTalle(producto))
        .then(()=>{
            navigate("/stock")
        })
    }
    return (
        <div className="row">
            <div className="col-md-1"><span>{producto.id}</span></div>
            <div className="col-md-2"><span>{producto.marca}</span></div>
            <div className="col-md-6"><span>{producto.modelo}</span></div>
            <div className="col-md-2"><span>$ </span><span>{producto.price}</span></div>
            <div className="col-md-1"><button onClick={accessoInventario}>Stock</button></div>
        </div>
    )
}

export default AdminRow