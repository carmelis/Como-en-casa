import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../state/user";
import { carritoProducto, totalProducto } from "../state/carrito";
import TableCarritoDeCompras from "../common/TableCarritoDeCompras";

function CarritoDeCompras() {
  const user = useSelector((state) => state.user);
  const carrito = useSelector((state) => state.carrito);
  const dispatch = useDispatch();
  const [productoEliminado, setProductoEliminado] = useState("");
  const [cambio, setCambio] = useState(0);

  const setL = (language) => {
    setCambio(language);
  };

  // Pedio para eliminar un producto por medio de un click
  const handleDeleteProducto = (id) => {
    axios.delete(`/api/carrito/delete/${id}`).then((mensaje) => {
      setProductoEliminado(mensaje);
      alert("Eliminado con exito del carrito");
    });
  };

  //funcion para optener carrito
  async function obtenerCarrito() {
    const pedido = await axios.get("/api/users/me");
    const user = await dispatch(userLogin(pedido.data));
    await dispatch(carritoProducto(user.payload.email));
  }

  //Pedido para mostrar los productos añadidos al carrito
  useEffect(() => {
    obtenerCarrito();
  }, [productoEliminado, cambio]);

  //Funcion para mostrar el valor total a pagar
  const totalApagar = () => {
    let total = 0;
    carrito.forEach((producto) => {
      const cant = producto.cantidad;
      const precio = producto.cartas[0].precio;
      total += cant * precio;
    });
    return total;
  };

  //Cheackout de pago
  const handleEfectivo = () => {
    axios
      .post("/api/pedido", { email: user.email, detalle: null })
      .then(() => alert("Compra con exito, vuelva pronto!!!"))
      .catch(() => alert("Error en la compra"));
  };

  return (
    <div className="carrito_container">
      <h2>CARRITO DE COMPRAS</h2>
      {user.id ? (
        <div className="container_table">
          <table>
            <thead>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Eliminar</th>
            </thead>
            <tbody>
              {carrito?.map((producto, index) => (
                <TableCarritoDeCompras
                  key={index}
                  producto={producto}
                  handleDeleteProducto={handleDeleteProducto}
                  setL={setL}
                />
              ))}
            </tbody>
          </table>
          <div className="container_total">
            <h3>TOTAL A PAGAR: ${totalApagar()} </h3>
          </div>
          <div className="container_formulario">
            <form>
              <h3>METODO DE PAGO</h3>
              <Link to="/pagoTarjeta">
                <button>PAGO TARJETA</button>
              </Link>
              <Link to="/pagoEfectivo">
                <button onClick={handleEfectivo}>EFECTIVO</button>
              </Link>
            </form>
          </div>
        </div>
      ) : (
        "INICIA SESION PARA AGREGAR PRODUCTOS AL CARRITO"
      )}
    </div>
  );
}

export default CarritoDeCompras;
