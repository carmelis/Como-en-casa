const { Carrito, Users, Pedido } = require("../models");
const enviarEmail = require("../config/nodemailer");

// me crea un producto en el pedido
const crearpedido = async (req, res) => {
  const { email, detalle } = req.body;
  try {
    const user = await Users.findOne({
      where: { email },
    });
    console.log("user", user);

    const usuariocarrito = await Carrito.findAll({
      where: {
        authorId: user.id,
      },
      include: [{ model: Users, as: "author" }, "cartas"],
    });
    
    const pedidos = await Pedido.findAll({
      include: [{ model: Users, as: "ordenfinalizada" }, "cartas"],
    });
    console.log("usuariocarrito", usuariocarrito);
    for (let i = 0; i < usuariocarrito.length; i++) {
      if (pedidos[0]) {
        /*pedidos[1]*/
        console.log("hola pedido", pedidos);
        let pedido = await Pedido.create({
          detalle: detalle,
          idpedido: pedidos[pedidos.length - 1].idpedido + 1,
          cantidad: usuariocarrito[i].dataValues.cantidad,
        });

        await pedido.setOrdenfinalizada(user);
        await pedido.addCartas(usuariocarrito[i].dataValues.cartas[0]);

        //
      } else {
        console.log("hola no pedido");
        let pedido = await Pedido.create({
          detalle: detalle,
          idpedido: 1,
          cantidad: usuariocarrito[i].dataValues.cantidad,
        });

        await pedido.setOrdenfinalizada(user);
        await pedido.addCartas(usuariocarrito[i].dataValues.cartas[0]);
      }
    }
    // enviarEmail(email);
    //solucion1
    ////////////////////////
    // let pedidos = [];
    // for (let i = 0; i < usuariocarrito.length; i++) {
    //   pedidos.push(usuariocarrito[i].dataValues.cartas[0].dataValues.id);
    //   console.log("que pasa", usuariocarrito);
    // }
    // console.log("pedidos", pedidos);
    // const pedido = await Pedido.create({
    //   detalle: detalle,
    //   idcomprado: pedidos,
    // });

    /////////////////////////
    const carritoborrado = await Carrito.destroy({
      where: {
        authorId: user.id,
      },
      include: [{ model: Users, as: "author" }, "cartas"],
    });
    res.send("se compro");
  } catch (error) {
    console.log(error);
  }
};

/// traeme todos los pedidos de todos los usuarios
const getAllpedidos = async (req, res) => {
  Pedido.findAll({
    include: [{ model: Users, as: "ordenfinalizada" }, "cartas"],
  })
    .then((carritos) => res.status(200).send(carritos))
    .catch((err) => res.status(400).send(err));
};

// me trae el pedido de un usuario
const getpedidouser = async (req, res) => {
  const email = req.params.email;

  try {
    const user = await Users.findOne({
      where: { email },
    });

    const usuariopedido = await Pedido.findAll({
      where: {
        ordenfinalizadaId: user.id,
      },
      include: [{ model: Users, as: "ordenfinalizada" }, "cartas"],
    });
    console.log("user2", usuariopedido[0]);
    res.send(usuariopedido);
  } catch (error) {
    console.log(error);
  }
};

//me trae los pedidos no comentados
const getpedidousercomentado = async (req, res) => {
  const email = req.params.email;

  try {
    const user = await Users.findOne({
      where: { email },
    });

    const usuariopedido = await Pedido.findAll({
      where: {
        ordenfinalizadaId: user.id,
        comentado: false,
      },
      include: [{ model: Users, as: "ordenfinalizada" }, "cartas"],
    });
    console.log("user2", usuariopedido[0]);
    res.send(usuariopedido);
  } catch (error) {
    console.log(error);
  }
};

//eliminar pedido
const deletepedido = async (req, res) => {
  const id = req.params.id;
  Carrito.destroy({ where: { id } })
    .then(() => res.send("Producto eliminado"))
    .catch((err) => res.status(400).send(err));
};

module.exports = {
  crearpedido,
  getAllpedidos,
  getpedidouser,
  getpedidousercomentado,
  deletepedido,
};
