import { Routes, Route } from "react-router";
import "./App.css";

/* Renderizado condicional, admin y carrito si no hay un User loggeado */

function App() {
  return (
    <div className="App">
      {"Navbar"}
      <Routes>
        <Route path="/home" element={"home"} />
        <Route path="/register" element={"register"} />
        <Route path="/login" element={"login"} />
        <Route path="/admin" element={"admin"} />
        <Route path="/cart" element={"cart"} />
        <Route path="/sku" element={"productCard"} />
      </Routes>
      {"Footer re cheto"}
    </div>
  );
}

export default App;
