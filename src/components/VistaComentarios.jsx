import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function VistaComentarios() {
  const user = useSelector((state) => state.user);

  const [ordenes, setordenes] = useState([]);
  const [comentario, setComentario] = useState("");
  const [puntaje, setPuntaje] = useState("");

  useEffect(() => {
    if (!user.tipo) {
      axios
        .get(`/api/pedido/comentado/${user.email}`)
        .then((res) => setordenes(res.data))
        .catch((error) => console.error(error));
    } else {
      axios
        .get(`/api/pedido`)
        .then((res) => setordenes(res.data))
        .catch((error) => console.error(error));
    }
  }, [user.email]);

  return (
    <div className="containerTabla">
      {ordenes.map((orden) => {
        const { nombre, precio, imagen, id } = orden.cartas[0];
        console.log(orden);
        const handleSubmit = (e) => {
          e.preventDefault();
          console.log(puntaje);
          console.log("comentario", comentario, id);
          axios.post("/api/comentarios", {
            comentarios: comentario,
            idcarta: id,
            puntaje: puntaje,
            email: user.email,
            idpedido: orden.idpedido,
          });
          alert("comentando enviado");
        };
        return (
          <div className="containercomentarios">
            <div className="divpedido">
              <p>Pedido:{orden.idpedido}</p>
            </div>
            <figure className="imagen">
              <img src={imagen} className="imagen" alt="" />
            </figure>
            <div className="divcomentarios">
              <p> {nombre}</p>

              <p>Precio:{precio}</p>
            </div>
            <div className="divfecha">
              <p>Fecha:{orden.createdAt.slice(0, 10)} </p>

              <p>Hora:{orden.createdAt.slice(11, 19)}hs</p>
            </div>
            <form className="formulariocomentario" onSubmit={handleSubmit}>
              <textarea
                type="text"
                required
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Agregar comentario"
              />

              <div className="rating">
                <input
                  type="radio"
                  id="rate1"
                  name="rating"
                  value="1"
                  onChange={(e) => setPuntaje(e.target.value)}
                />
                <label for="rate1">1 star</label>

                <input
                  type="radio"
                  id="rate2"
                  name="rating"
                  value="2"
                  onChange={(e) => setPuntaje(e.target.value)}
                />
                <label for="rate2">2 stars</label>

                <input
                  type="radio"
                  id="rate3"
                  name="rating"
                  value="3"
                  onChange={(e) => setPuntaje(e.target.value)}
                />
                <label for="rate3">3 stars</label>

                <input
                  type="radio"
                  id="rate4"
                  name="rating"
                  value="4"
                  onChange={(e) => setPuntaje(e.target.value)}
                />
                <label for="rate4">4 stars</label>

                <input
                  type="radio"
                  id="rate5"
                  name="rating"
                  value="5"
                  onChange={(e) => setPuntaje(e.target.value)}
                />
                <label for="rate5">5 stars</label>

                <span class="focus-ring"></span>
              </div>
              <button>Enviar</button>
            </form>
          </div>
        );
      })}
    </div>
  );
}

export default VistaComentarios;
