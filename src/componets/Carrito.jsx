import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/form.css";
import CartItem from "../commons/CartItem";


const Carrito =()=>{
    const cartItems= useSelector((state)=> state.cart)
    return(<>
      <div id="canvas" class="columns">
        <div class="column is-three-fifths">Producto</div>
        <div class="column">Cantidad</div>
        <div class="column">Subtotal</div>
      </div>
      <div class="card">
        <div class="card-body cartItem">
        <img src="https://rebajasok.com/6211-large_default/zapatilla-gummi-aired.jpg" class="img-thumbnail cartImg" alt="..."/>
        <h3>This is some text within a card body.</h3>
       </div>
      </div>
    </>
    )
}

export default Carrito