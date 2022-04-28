import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router"
import { cart } from "../states/cart"
import SubmitBtn from "../commons/SubmitBtn";
import Loading from "../commons/Loading";
import { useState } from "react";


const Confirm = function (){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [boton , setBoton] = useState("button is-success is-fullwidth")
    const user = useSelector(state=>state.user)
    const cartItems=useSelector((state)=>state.cart)
    const direccion = useSelector(state=>state.send)
    const finalizar = ()=>{
        setBoton("button is-success is-loading is-fullwidth")
        const compra = {
            productos_comprados: cartItems,
            precio_final: !cartItems[0]?0:cartItems.map((Obj)=>Obj.cantidad * Obj.costo).reduce((accumulator, curr) => accumulator + curr),
            forma_entrega: "Envio a domicilio",
            medio_de_pago: ` Tarjeta de crédito/débito terminada en: ${direccion.cardNumber.slice(-4)}`,
            datos_contacto: direccion
          }
        axios
        .post("api/users/finalizar_compra" , compra)
        .then(()=>{
            console.log("compra exitosa")
            dispatch(cart())
            .then(()=>{
                console.log("carrito actualizado")
                navigate("/")
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    }
    return (<>
        <div id="login" class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Resumen de compra.</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <span>Nombre y apellido:</span><span>{` ${direccion.fullName}`}</span>
            </div>
            <div class="modal-body">
            <span>Dirección:</span><span>{` ${direccion.direccion}`}</span>
            </div>
            <div class="modal-body">
            <span>Telefono de contacto:</span><span>{` ${user.telefono}`}</span>
            </div>
            <div class="modal-body">
            <span>Correo electrónico:</span><span>{` ${user.email}`}</span>
            </div>
            <div class="modal-body">
            <span>Medio de pago:</span><span>{` Tarjeta de crédito/débito terminada en: ${direccion.cardNumber.slice(-4)}`}</span>
            </div>
            <div class="modal-body">
                Observaciones: Recibirás tu compra en un máximo de 72 hs.hábiles.
            </div>
            <div class="modal-body">
            <span>Monto total de compra:</span><span>{`$ ${!cartItems[0]?0:cartItems.map((Obj)=>Obj.cantidad * Obj.costo).reduce((accumulator, curr) => accumulator + curr)}`}</span>
            </div>
            <div class="modal-footer">
                <button onClick={finalizar} type="button" class={boton}>Comprar</button>
            </div>
            </div>
        </div>
</>)
}
export default Confirm
