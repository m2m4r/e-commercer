import { useDispatch, useSelector } from "react-redux"
import Inventario from "./Inventario"
import { useState } from "react"
import { addStock } from "../states/admin"
const TalleRow = function(){
    const dispatch = useDispatch()
    const talles=[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]
    const producto = useSelector(state=>state.inventario)
    const inventarios = producto.inventarios
    const [selectTalle , setSelectTalle]=useState(talles[0])
    const [selectCantidad , setSelectCantidad]=useState(0)
    
    const crearTalle = function(){
        const option = {
            id:producto.id,
            talle:selectTalle,
            stock:selectCantidad
        }
        dispatch(addStock(option)).then(r=>console.log(r.data)).catch(err=>console.log(err))
    }
    return (
        <>
            <div id="adminMargen" className="row">
                <div className="col-md-1">MARCA</div>
                <div className="col-md-6">MODELO</div>
                <div className="col-md-2">TALLE</div>
                <div className="col-md-2">STOCK</div>
                <div className="col-md-1">
                    <button id="btn" classNameName="button is-small" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
                    <i className="fa-solid fa-plus"></i>
                    </button>
                    <div className="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasBottomLabel">Registrar talle</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                        <div id="canvasTalle" className="offcanvas-body small">
                            <div id="addTalle" className="input-group flex-nowrap">
                                <div className="control">
                                    <div className="select">
                                        <select onChange={(e)=>{setSelectTalle(e.target.value)}}>
                                            {talles.map(talle=>(<option>{talle}</option>))}
                                        </select>
                                    </div>
                                </div>
                                <div className="control">
                                    <input onChange={(e)=>{setSelectCantidad(e.target.value)}} className="input" type="number" placeholder="Cantidad"/>
                                </div>
                                <div className="control">
                                    <button onClick={crearTalle} className="button is-primary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {inventarios && inventarios.map((talle , i)=>(
                    <Inventario prod={producto} inv={talle} i={i} />
            ))}
            </div>
        </>
    )
    
}
export default TalleRow