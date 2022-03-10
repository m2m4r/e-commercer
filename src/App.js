import { Routes, Route } from "react-router";
import { useEffect } from "react";
import Navbar from "./componets/Navbar";
import Register from "./componets/Register";
import Login from "./componets/Login";
import { effectLogin } from "./states/usario";
import Home from "./componets/Home";

/* Renderizado condicional, admin y carrito si no hay un User loggeado */

function App() {
  useEffect(effectLogin(), []);
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      {/* <Grid /> EL grid queda aca de prueba hasta que este el home component */}
      {"Footer re cheto"}
    </div>
  );
}

export default App;

/*
Las routes quedan aca hasta que estén listos los componentes a renderizar 
<Routes>
        
        <Route path="/register" element={"register"} />
        <Route path="/login" element={"login"} />
        <Route path="/admin" element={"admin"} />
        <Route path="/cart" element={"cart"} />

        <Route path="/sku" element={"productCard"} />
</Routes>
*/
