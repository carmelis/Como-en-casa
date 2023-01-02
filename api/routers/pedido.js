const express = require("express");
const router = express.Router();
const { Pedido, Users, Cartas, Carrito } = require("../models");

const PedidoController = require("../controllers/PedidosController");
const validateAuth = require("../middleware/auth");
// me crea un producto en el pedido
router.post("/", validateAuth, PedidoController.crearpedido);

//me trae todos los pedidos

router.get("/", validateAuth, PedidoController.getAllpedidos);

// me trae los pedidos de un usuario

router.get("/:email", validateAuth, PedidoController.getpedidouser);

// me trae los pedidos de un usuario que no califico

router.get(
  "/comentado/:email",
  validateAuth,
  PedidoController.getpedidousercomentado
);

router.delete("/delete/:id", validateAuth, PedidoController.deletepedido);
//me edita el campo comprado a true

// router.put("/editarcomprado/:email", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await Users.findOne({
//       where: { email },
//     });
//     const usuariopedido = await Pedido.update(
//       { comprado: "si" },
//       {
//         returning: true,
//         plain: true,
//         where: {
//           ordenfinalizadaId: user.id,
//         },

//         include: [{ model: Users, as: "ordenfinalizada" }, "cartas"],
//       }
//     );

/////////////////////////////////////////////////////////////////////////

// const usuariopedido = await Pedido.findAll({
//   where: {
//     ordenfinalizadaId: user.id,
//   },
//   include: [{ model: Users, as: "ordenfinalizada" }, "cartas"],
// });

// let updatepedido = (usuariopedido[0].dataValues.comprado = "si");

// await updatepedido.save();

//     res.status(200).send("se ha modificado");
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
