import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function VistaHistorial() {
  const user = useSelector((state) => state.user);

  const [ordenes, setordenes] = useState([]);
  // const [admin, setadmin] = useState(false);
  // if (user.tipo) {
  //   console.log("holahola");
  //   setadmin(true);
  // }

  useEffect(() => {
    if (!user.tipo) {
      axios
        .get(`/api/pedido/${user.email}`)
        .then((res) => setordenes(res.data))
        .catch((error) => console.error(error));
    } else {
      axios
        .get(`/api/pedido`)
        .then((res) => setordenes(res.data))
        .catch((error) => console.error(error));
    }
  }, [user.email]);

  // useEffect(() => {
  //   axios
  //     .get(`/api/pedido`)
  //     .then((res) => setordenes(res.data))
  //     .catch((error) => console.error(error));
  // }, [admin]);

  return (
    <div className="containerTabla">
      <div className="tabla">
        <table>
          <tr>
            <th>PEDIDO</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>IMPORTE</th>
            <th>Cantidad</th>
            <th>FECHA</th>
            <th>HORARIO</th>
          </tr>

          {ordenes.map((orden) => {
            const { nombre, precio } = orden.cartas[0];
            console.log(orden);
            return (
              <tr>
                <td>{orden.idpedido}</td>
                <td>{nombre}</td>
                <td>{orden.ordenfinalizada.email}</td>
                <td>{precio}</td>
                <td>{orden.cantidad}</td>

                <td>{orden.createdAt.slice(0, 10)}hs</td>
                <td>{orden.createdAt.slice(11, 19)}hs</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default VistaHistorial;
