import { Routes, Route } from "react-router";
import { useEffect } from "react";
import Navbar from "./componets/Navbar";
import Register from "./componets/Register";
import Login from "./componets/Login";
import Home from "./componets/Home";
import { useDispatch } from "react-redux";
import Carrito from "./componets/Carrito";
import { effectLogin } from "./states/usario";
import CardDetail from "./commons/CardDetail";
import { effectProducts } from "./states/productos";
import { cart } from "./states/cart";
import { useSelector } from "react-redux";
import Footer from "./componets/Footer";
import SendPage from "./componets/SendPage";
import BuyPage from "./componets/BuyPage";
import Confirm from "./componets/Confirm";
import AdminPage from "./componets/AdminPage";

/* Renderizado condicional, admin y carrito si no hay un User loggeado */

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(effectLogin())
      .then((res) => {
        console.log("1", res);
      })
      .catch((err) => console.log(err));
  }, []);
  const usuario = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(effectProducts())
      .then((res) => {
        console.log("2", res);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    dispatch(cart())
      .then((res) => {
        console.log("3", res);
      })
      .catch((err) => console.log(err));
  }, [usuario]);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<CardDetail />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/datos_de_envio" element={<SendPage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;