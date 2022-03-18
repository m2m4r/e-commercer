import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { inventarioTalle } from "../states/inventario"

const AdminRow = function({producto}){
    console.log("ver que ondaaa", producto)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accessoInventario = ()=>{
        dispatch(inventarioTalle(producto))
        .then(()=>{
            navigate("/stock")
        })
    }
    return (
        <div class="row">
            <div class="col-md-1"><span>{producto.id}</span></div>
            <div class="col-md-2"><span>{producto.marca}</span></div>
            <div class="col-md-6"><span>{producto.modelo}</span></div>
            <div class="col-md-2"><span>$ </span><span>{producto.price}</span></div>
            <div class="col-md-1"><button onClick={accessoInventario}>Stock</button></div>
        </div>
    )
}

export default AdminRow