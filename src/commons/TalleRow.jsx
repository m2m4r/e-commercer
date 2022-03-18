import { useSelector } from "react-redux"
import Inventario from "./Inventario"
import { useState } from "react"
const TalleRow = function(){
    const talles=[21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]
    const producto = useSelector(state=>state.inventario)
    const inventarios = producto.inventarios
    const [selectTalle , setSelectTalle]=useState(talles[0])
    const [selectCantidad , setSelectCantidad]=useState(0)
    
    return (
        <>
            <div id="adminMargen" class="row">
                <div class="col-md-1">MARCA</div>
                <div class="col-md-6">MODELO</div>
                <div class="col-md-2">TALLE</div>
                <div class="col-md-2">STOCK</div>
                <div class="col-md-1">
                    <button id="btn" className="button is-small" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
                    <i class="fa-solid fa-plus"></i>
                    </button>
                    <div class="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasBottomLabel">Registrar talle</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                        <div id="canvasTalle" class="offcanvas-body small">
                            <div id="addTalle" class="input-group flex-nowrap">
                                <div class="control">
                                    <div class="select">
                                        <select onChange={(e)=>{setSelectTalle(e.target.value)}}>
                                            {talles.map(talle=>(<option>{talle}</option>))}
                                        </select>
                                    </div>
                                </div>
                                <div class="control">
                                    <input onChange={(e)=>{selectCantidad(e.target.value)}} class="input" type="number" placeholder="Cantidad"/>
                                </div>
                                <div class="control">
                                    <button class="button is-primary">Submit</button>
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