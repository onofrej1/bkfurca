module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "MenuItem",
    {
      title: {
        type: DataTypes.STRING
      },
      menu_id: {
        type: DataTypes.INTEGER
      },
      parent_id: {
        type: DataTypes.INTEGER
      },
      page_id: {
        type: DataTypes.INTEGER
      },
      link: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
      tableName: 'menu_item'
    }
  );
};
