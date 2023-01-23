import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AiFillDelete } from "react-icons/ai";

function TableCarritoDeCompras({ producto, handleDeleteProducto, setL }) {
  const { imagen, nombre, descripcion, precio } = producto.cartas[0];
  const { cantidad } = producto;
  const [cant, setCant] = useState(cantidad);
  const user = useSelector((state) => state.user);

  //   Funcion para sumar un numero y producto en cantidad
  const handleSuma = () => {
    axios
      .post("/api/carrito", {
        email: user.email,
        idcarta: producto.cartas[0].id,
        detalle: null,
      })
      .then((cant) => {
        setCant(cant.data.cantidad);
        setL(cant.data.cantidad);
      })
      .then(() => alert("Se a agregado"))
      .catch(() => alert("No se a agregado"));
  };

  //   Funcion para restar un numero y producto en cantidad
  const handleResta = () => {
    axios
      .post("/api/carrito", {
        email: user.email,
        idcarta: producto.cartas[0].id,
        detalle: null,
        restar: "restando",
      })
      .then((cant) => {
        setCant(cant.data.cantidad);
        setL(cant.data.cantidad);
      })
      .then(() => alert("Se a quitado con exito"))
      .catch(() => alert("No se a eliminado!"));
  };

  return (
    <tr className="row_table">
      <td>
        <img src={imagen} alt="producto" />
      </td>
      <td>{nombre}</td>
      <td>{descripcion}</td>
      <td>{precio * cant}</td>
      <td>
        <button onClick={handleResta}>-</button>
        {cant}
        <button onClick={handleSuma}>+</button>
      </td>
      <td>
        <button onClick={() => handleDeleteProducto(producto.id)}>
          <AiFillDelete />
        </button>
      </td>
    </tr>
  );
}

export default TableCarritoDeCompras;
