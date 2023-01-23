const { Carrito, Users, Cartas } = require("../models");

//crear carrito
const postcarrito = async (req, res) => {
  try {
    const { email, idcarta, detalle, restar } = req.body;

    //encontrar el usuario
    const usuario = await Users.findOne({
      where: { email },
    });
    //encuentro el producto
    const carta = await Cartas.findOne({
      where: { id: idcarta },
    });
    //encuentro los productos del usuario
    const usuariocarrito = await Carrito.findAll({
      where: {
        authorId: usuario.id,
      },
      include: [{ model: Users, as: "author" }, "cartas"],
    });
    let resultado = false;
    //me fijo si ese producto esta y si esta le sumo uno a la cantidad
    usuariocarrito.forEach((persona) => {
      if (persona.cartas[0].id == idcarta && !restar) {
        resultado = true;
        persona.cantidad = persona.cantidad + 1;
        persona.save();
        return res.send(persona)
      }
      //si en restar aparece en el body, le resto uno en cantidad
      if (persona.cartas[0].id == idcarta && restar) {
        resultado = true;
        persona.cantidad = persona.cantidad - 1;
        persona.save();
        return res.send(persona)
      }
    });
    //sino esta ese producto en el usuario, lo creo con sus relaciones
    if (resultado == false) {
      const carrito = await Carrito.create({ detalle: detalle });
      await carrito.setAuthor(usuario);
      await carrito.addCartas(carta);
      res.send(carrito);
    }
    res.send(usuariocarrito);
  } catch (error) {
    console.log(error);
  }
};

//traer carrito
const getallcarrito = async (req, res) => {
  Carrito.findAll({ include: [{ model: Users, as: "author" }, "cartas"] })
    .then((carritos) => {
      carritos.sort((a,b) => a.id-b.id) 
      res.status(200).send(carritos)
    })
    .catch((err) => res.status(400).send(err));
};
//traer carrito de un usuario
const getcarritouser = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await Users.findOne({
      where: { email },
    });

    const usuariocarrito = await Carrito.findAll({
      where: {
        authorId: user.id,
      },
      include: [{ model: Users, as: "author" }, "cartas"],
    });
    usuariocarrito.sort((a,b) => a.id-b.id)
    res.send(usuariocarrito);
  } catch (error) {
    console.log(error);
  }
};

//eliminar un producto del carrito
const deletecarrito = async (req, res) => {
  const id = req.params.id;
  Carrito.destroy({ where: { id } })
    .then(() => res.send("Producto eliminado"))
    .catch((err) => res.status(400).send(err));
};

//eliminar carrito de un usuario
const deleteallcarritouser = async (req, res) => {
  const email = req.params.email;
  try {
    const user = await Users.findOne({
      where: { email },
    });
    const usuariocarrito = await Carrito.destroy({
      where: {
        authorId: user.id,
      },
      include: [{ model: Users, as: "author" }, "cartas"],
    });
    res.send("se elimino");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postcarrito,
  getallcarrito,
  getcarritouser,
  deletecarrito,
  deleteallcarritouser,
};
