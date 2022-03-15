import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/form.css";
import CartItem from "../commons/CartItem";


const Carrito =function(){
  const cartItems=useSelector((state)=>state.cart)
  console.log("VER COMO SE MODIFICA------>>>>>>>>" , cartItems)
    return(<>
      {cartItems && cartItems.map((item , i)=>(<CartItem key={i} producto={item}/>))}
      <div className="columns container">
        <div id="totalTitle" className="column is-three-fifths">Total de compra</div>
        <div id="totalMonto" className="column">{`$ ${!cartItems[0]?0:cartItems.map((Obj)=>Obj.cantidad * Obj.costo).reduce((accumulator, curr) => accumulator + curr)}`}</div>
      </div>
      {cartItems[0]?<button className="button is-primary is-fullwidth">Finalizar tu compra</button>:<></>}
    </>
    )
}

export default Carrito