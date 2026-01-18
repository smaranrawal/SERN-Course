const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    item_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    no_of_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    status: {
      type: DataTypes.ENUM("pending", "checkout"),
      defaultValue: "pending",
      allowNull: false,
    },
  },
  {
    tableName: "cart",
    timestamps: true,
  }
);
module.exports = Cart;
