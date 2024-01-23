
module.exports = (sequelize, DataTypes) =>{

    let alias = 'Actores';
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        first_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: DataTypes.DECIMAL,
        favorite_movie_id: DataTypes.INTEGER 
    }

    let config = {
        tableName: 'actors',
        timestamps: false
    }

    let Actor = sequelize.define(alias, columns, config);

    Actor.associate = function(models){
        Actor.belongsTo(models.Peliculas, {
            as: 'peliculaFavorita',
            foreignKey: 'favorite_movie_id'
        })

        Actor.belongsToMany(models.Peliculas, {
            as: 'peliculas',
            through: models.Peliculas_Actores,
            foreignKey: 'actor_id',
            otherKey: 'movie_id'
        })

        Actor.hasMany(models.Peliculas_Actores, {
            as: 'peliculaActores',
            foreignKey:'actor_id'
        })
    }

    return Actor;
}
