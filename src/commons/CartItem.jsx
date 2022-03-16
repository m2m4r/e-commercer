import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/form.css";
import { useDispatch } from "react-redux";
import { updateCartItem, deleteCartItem } from "../states/cart";
import cart from "../states/cart";

const CartItem = function ({ producto }) {
  const dispatch = useDispatch();
  const [item, setItem] = useState({});
  // const [cantidad , setCantidad] = useState(producto.cantidad)
  useEffect(() => {
    axios
      .get(`/api/users/productos/${producto.productoId}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = () => {
    dispatch(deleteCartItem(producto.productoId));
  };
  const resta = () => {
    if (producto.cantidad > 0) {
      dispatch(
        updateCartItem([
          producto.productoId,
          producto.cantidad - 1,
          producto.talle,
        ])
      );
    }
  };
  const suma = () => {
    dispatch(
      updateCartItem([
        producto.productoId,
        producto.cantidad + 1,
        producto.talle,
      ])
    );
  };
  return (
    <div id="itemContent" className="row">
      <div className="col-3">
        <img
          src={!item.image_url ? "" : item.image_url[0]}
          className="img-thumbnail cartImg"
          alt="sin imagen"
        />
      </div>
      <div className="col-9 colFlex">
        <p className="itemTitle">{`${item.modelo} Talle ${producto.talle}`}</p>
        <div className="columns container">
          <div className="col-8">
            <p id="colItem" className="input is-small">
              {producto.cantidad}
            </p>
            <button id="btn" onClick={resta} className="button is-small">
              <i className="fa-solid fa-minus"></i>
            </button>
            <button onClick={suma} className="button is-small">
              <i className="fa-solid fa-plus"></i>
            </button>
            <button
              onClick={() => {
                handleDelete();
              }}
              className="button is-small"
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
          <div id="subTotal" className="col-3 offset-md-3">
            <h5 className="subTotal">Subtotal</h5>
            <h6>{`$ ${producto.costo * producto.cantidad}`}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
