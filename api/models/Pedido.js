const { INTEGER } = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../config/db");
//const bcrypt = require("bcrypt");

class Pedido extends Sequelize.Model {}

Pedido.init(
  {
    detalle: {
      type: Sequelize.STRING,
    },

    comentado: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    idpedido: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    cantidad: {
      type: Sequelize.INTEGER,
    },
  },
  { sequelize: db, modelName: "pedido" }
);

module.exports = Pedido;
