module.exports = function (sequelize, DataTypes) {
  const Joke = sequelize.define("Joke", {
    quote: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSaved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Joke.associate = (models) => {
    Joke.belongsTo(models.user);
  };
  return Joke;
};
