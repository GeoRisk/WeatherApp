module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites", {
    // The email cannot be null, and must be a proper email before creation
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  return Favorites;
  
//Left join tables in database to save user favorites.
db.Favorites.belongsTo(db.Users, {foreignKey: "id"});

};

