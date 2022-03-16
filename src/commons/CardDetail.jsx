import "../styles/cardetail.css";
import { ProductContext } from "../context/product";
import { useContext, useEffect, useState } from "react";
import ButtonSize from "./ButtonSize";
import userReducer from "../states/usario";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../states/cart";
import { SizeContext } from "../context/size";
import { useParams } from "react-router";

const CardDetail = () => {
  const { producto, setProducto } = useContext(ProductContext);
  const { size } = useContext(SizeContext);
  const [cantidad, setCantidad] = useState(0);
  const id = useParams("id");

  const dispatch = useDispatch();

  const sendCart = () => {
    dispatch(
      addCartItem({
        productId: producto.id,
        cantidad: Number(cantidad),
        talle: Number(size),
      })
    );
  };

  return producto.inventarios ? (
    <div className="cardetail">
      <div className="foto">
        <img className="fotito" src={producto.image_url} alt="" />
      </div>
      <div className="desc">
        <div className="nose">
          <span>{producto.marca}</span>
          <h1>{producto.modelo}</h1>
          <div>
            <div>
              <strong>Tabla de talles</strong>
            </div>
            <div className="gridButton">
              {producto.inventarios.map((t, i) => (
                <ButtonSize key={i} talle={t.talle} />
              ))}
            </div>
          </div>

          <div>
            <h3>Precio ${producto.price}</h3>
            <button className="boton" onClick={sendCart}>
              {" "}
              Añadir al Carrito
            </button>
            <label>
              Cantidad:
              <input
                type="number"
                className="cantidad"
                onChange={(e) => setCantidad(e.target.value)}
              />
            </label>
          </div>
          <p>{producto.descripcion}</p>
        </div>
      </div>
    </div>
  ) : (
    <h1 className="mt-7 is-size-1 has-text-centered"> Cargando aguanta ...</h1>
  );
};

export default CardDetail;
