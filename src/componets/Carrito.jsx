import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/form.css";
import CartItem from "../commons/CartItem";
import { Link } from "react-router-dom";


const Carrito =function(){
  const cartItems=useSelector((state)=>state.cart)
    return(<>
      {cartItems && cartItems.map((item , i)=>(<CartItem key={i} producto={item}/>))}
      <div className="columns container">
        <div id="totalTitle" className="column is-three-fifths">Total de compra</div>
        <div id="totalMonto" className="column">{`$ ${!cartItems[0]?0:cartItems.map((Obj)=>Obj.cantidad * Obj.costo).reduce((accumulator, curr) => accumulator + curr)}`}</div>
      </div>
      {cartItems[0]?<Link to="/datos_de_envio"><button className="button is-primary is-fullwidth" data-bs-dismiss="offcanvas">Finalizar tu compra</button></Link>:<></>}
    </>
    )
}

export default Carrito