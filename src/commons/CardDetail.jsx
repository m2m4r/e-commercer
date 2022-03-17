import "../styles/cardetail.css";
import { ProductContext } from "../context/product";
import { useContext, useEffect, useState } from "react";
import ButtonSize from "./ButtonSize";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../states/cart";
import { SizeContext } from "../context/size";
import { useParams } from "react-router";
import axios from "axios";
import AlertCompra from "./AlertCompra";

const CardDetail = () => {
  const { producto, setProducto } = useContext(ProductContext);
  const { size } = useContext(SizeContext);
  const [cantidad, setCantidad] = useState(0);
  const [display, setDisplay] = useState(false);
  const id = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/productos/${id.id}`)
      .then((data) => {
        setProducto(data.data);
      });
    window.scrollTo(0, 0);
  }, [id]);

  const dispatch = useDispatch();
  console.log(display);

  const sendCart = () => {
    dispatch(
      addCartItem({
        productId: producto.id,
        cantidad: Number(cantidad),
        talle: Number(size),
      })
    ).then(() => setDisplay(true));
  };
  console.log(display);
  return producto.inventarios ? (
    <>
      <AlertCompra display={display} />
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
              <button
                className="boton"
                onClick={() => {
                  sendCart();
                }}
              >
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
    </>
  ) : (
    <h1 className="mt-7 is-size-1 has-text-centered"> Cargando aguanta ...</h1>
  );
};

export default CardDetail;
