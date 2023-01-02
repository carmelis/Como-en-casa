import Login from "./Login";
import Registro from "./Registro";
import Navbar from "./Navbar";
import Inicio from "./Inicio";
import Productos from "./Productos";
import Footer from "./Footer";
import VistaHistorial from "./VistaHistorial";
import VistaComentarios from "./VistaComentarios";
import { Route, Routes } from "react-router";
import ProductoDetallado from "../common/ProductoDetallado";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { userLogin } from "../state/user";
import { useState } from "react";
import CarritoDeCompras from "./CarritoDeCompras";
import Pago from "./PagoTarjeta";
import PagoEfectivo from "./PagoEfectivo";
import VistaAdminUsuarios from "./VistaAdminUsuarios";
import { useSelector } from "react-redux";
import Contacto from "./Contacto";
import VistaNosotros from "./VistaNosotros";

function App() {
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user);

  //Pedido para obtener todos los productos

  useEffect(() => {
    axios
      .get("/api/cartas")
      .then((res) => res.data)
      .then((cartas) => setProducts(cartas))
      .catch((error) => console.error(error));
  }, []);

  //Persistencia de usuario a cierra o refresh de pagina
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((res) => res.data)
      .then((user) => dispatch(userLogin(user)))
      .catch(() => console.error("Falta loguearte"));
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio products={products} />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="historial" element={<VistaHistorial />}></Route>
        <Route path="comentarios" element={<VistaComentarios />}></Route>
        <Route path="registro" element={<Registro />}></Route>
        <Route path="contacto" element={<Contacto />}></Route>
        <Route path="carrito" element={<CarritoDeCompras />}></Route>
        <Route path="pagoTarjeta" element={<Pago />}></Route>
        <Route path="pagoEfectivo" element={<PagoEfectivo />}></Route>
        <Route path="productos" element={<Productos />}></Route>
        /*
        <Route
          path="productos"
          element={<Productos products={products} />}
        ></Route>
        */
        <Route path="/productos/:id" element={<ProductoDetallado />}></Route>
        {user.superAdmin ? (
          <Route path="/admin/users" element={<VistaAdminUsuarios />}></Route>
        ) : (
          // <Route path="/" element={<Inicio products={products} />}></Route>
          // <h1>NECESITAS SER ADMIN PARA ENTRAR A ESTA DIRECCION</h1>
          ""
          /* La idea es que si no sos admin poniendo la direccion para editar usuarios
          se te redirija a la pagina de inicio o a una nueva pagina que se indique que no sos admin
          o un alerta, etc*/
        )}
        <Route path="/nosotros" element={<VistaNosotros />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
