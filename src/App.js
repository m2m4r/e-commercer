import { Routes, Route } from "react-router";
import Navbar from "./componets/Navbar";

/* Renderizado condicional, admin y carrito si no hay un User loggeado */

function App() {
  return (
    <div className="App">
      <Navbar/>
      <div>
      <Routes>
      
      </Routes>
      {"Footer re cheto"}
      </div>
    </div>
  );
}

export default App;

       /*<Route path="/home" element={"home"} />
        <Route path="/register" element={"register"} />
        <Route path="/login" element={"login"} />
        <Route path="/admin" element={"admin"} />
        <Route path="/cart" element={"cart"} />
        <Route path="/sku" element={"productCard"} />*/