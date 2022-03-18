import AdminRow from "../commons/AdminRow"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { addProduct } from "../states/admin"

const AdminPage = function(){
    const ProductList = useSelector(state=>state.admin)
    const dispatch = useDispatch()
    const [marca , setMarca]=useState()
    const [modelo , setModelo]=useState()
    const [precio , setPrecio]=useState()
    const [descripcion , setDescripcion]=useState()
    const [img , setImg]=useState()
    const crearArticulo= function(){
        const option={
            marca:marca,
            modelo:modelo,
            precio:precio,
            descripcion:descripcion,
            img:img
        }
        dispatch(addProduct(option)).then(r=>console.log(r.data)).catch(err=>console.log(err))
    }
    return (
    <>
        <div id="adminMargen" className="container">
            <div className="row">
                <div className="col-md-1">ID</div>
                <div className="col-md-2">MARCA</div>
                <div className="col-md-6">MODELO</div>
                <div className="col-md-2">PRECIO</div>
                <div className="col-md-1">
                    <button id="btn" classNameName="button is-small" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
                    <i className="fa-solid fa-plus"></i>
                    </button>
                    <div className="offcanvas offcanvas-bottom" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasBottomLabel">Registrar talle</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                        <div id="canvasProducto" className="offcanvas-body small">
                            <div id="addProducto" className="input-group flex-nowrap">
                                <div className="control">
                                    <div className="control">
                                        <input onChange={(e)=>{setMarca(e.target.value)}} className="input" type="text" placeholder="Marca"/>
                                    </div>
                                </div>
                                <div className="control">
                                    <div className="control">
                                        <input onChange={(e)=>{setModelo(e.target.value)}} className="input" type="text" placeholder="Modelo"/>
                                    </div>
                                </div>
                                <div className="control">
                                    <div className="control">
                                        <input onChange={(e)=>{setPrecio(e.target.value)}} className="input" type="number" placeholder="Precio al publico"/>
                                    </div>
                                </div>
                                <textarea onChange={(e)=>{setDescripcion(e.target.value)}} className="textarea" placeholder="Descripción"></textarea>
                                <div className="control">
                                    <div className="select" >
                                        <select>
                                        <option>Categoría</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="control">
                                    <div className="control">
                                        <input onChange={(e)=>{setImg(e.target.value)}} className="input" type="text" placeholder="URL imagen"/>
                                    </div>
                                </div>
                                <div className="control">
                                    <button onClick={crearArticulo} className="button is-primary">Agregar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {ProductList && ProductList.map((item , i)=>(<AdminRow key={i} producto={item}/>))}
        </div>
    </>
    )
}

export default AdminPage