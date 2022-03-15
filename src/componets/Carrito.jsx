import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/form.css";
import CartItem from "../commons/CartItem";
import { cart } from "../states/cart";


const Carrito =function(){
  const cartItems=useSelector((state)=>state.cart)
    return(<>
      {cartItems && cartItems.map((item)=>(<CartItem producto={item}/>))}
      <div className="columns container">
        <div id="totalTitle" className="column is-three-fifths">Total de compra</div>
        <div id="totalMonto" className="column">{`$ ${!cartItems[0]?0:cartItems.map((Obj)=>Obj.cantidad * Obj.costo).reduce((accumulator, curr) => accumulator + curr)}`}</div>
      </div>
      {cartItems[0]?<button class="button is-primary is-fullwidth">Finalizar tu compra</button>:<></>}
    </>
    )
}

export default Carrito