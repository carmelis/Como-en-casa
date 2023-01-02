const express = require("express");
const router = express.Router();
const { Comentarios, Cartas, Users, Pedido } = require("../models");

//agregar comentario
router.post("/", async (req, res) => {
  try {
    const { comentarios, idcarta, puntaje, email, idpedido } = req.body;
    //encuentro el id del producto
    const carta = await Cartas.findOne({
      where: { id: idcarta },
    });
    // edito el puntaje del producto
    carta.contador++;
    carta.puntaje = (carta.puntaje + req.body.puntaje) / carta.contador;
    carta.save();

    //encuentro el usuario
    const user = await Users.findOne({
      where: { email },
    });

    //

    //creo el comentario y guardo sus relaciones
    const comentariofinal = await Comentarios.create({ comentarios, puntaje });
    await comentariofinal.setReview(carta);
    await comentariofinal.addUsers(user);
    //Paso a true el producto comentado

    const pedido = await Pedido.findByPk(idpedido);
    pedido.update({ comentado: true });

    res.send(comentariofinal);
  } catch (error) {
    console.log(error);
  }
  // Encontrar todos los comentarios con sus relaciones
  router.get("/", (req, res) => {
    Comentarios.findAll({ include: [{ model: Cartas, as: "review" }, "users"] })
      .then((comentarios) => res.status(200).send(comentarios))
      .catch((err) => res.status(400).send(err));
  });

  //Encontrar los comentarios de un producto con sus relaciones
  router.get("/:productoid", async (req, res) => {
    const id = req.params.id;
    try {
      //encuentro producto
      const carta = await Cartas.findOne({
        where: { id },
      });
      // traigo todos los comentarios de ese producto
      const comentariosproducto = await Comentarios.findAll({
        where: {
          reviewId: carta.id,
        },
        //incluyo las relaciones para mostrarlas
        include: { include: [{ model: Cartas, as: "review" }, "users"] },
      });
      res.send(comentariosproducto);
    } catch (error) {
      console.log(error);
    }
  });
  //Encontrar los comentarios de un usuario en particular
  router.get("/user/:useremail", async (req, res) => {
    const email = req.params.useremail;
    try {
      //traigo usuario

      let usuario = await Users.findOne({ where: { email } });

      //traigo los comentarios de ese usuario

      let comentariosdeusuario = await usuario.getComentarios();

      //   const user = await Users.findOne({
      //     where: { email },
      //   });

      //   const comentariosusuario = await Users.findAll({
      //     where: {
      //       users: user.id,
      //     },
      //     include: [{ model: Cartas, as: "review" }, "users"],
      //   });
      res.send(comentariosdeusuario);
    } catch (error) {
      console.log(error);
    }
  });

  //Encontrar el comentario de un producto con sus relaciones
  //   Comentarios.findByPk(id)
  //     .then((producto) =>
  //       producto.update({
  //         comentarios: [...producto.comentarios, req.body.comentarios],
  //       })
  //     )
  //     .then((productoUpdated) => res.send(productoUpdated))
  //     .catch((err) => res.status(400).send(err));
});

module.exports = router;
