
module.exports = (sequelize, DataTypes) => {
    let alias = 'Generos';
    let columns = {
        name: {
            type: DataTypes.STRING,
        },
        ranking: {
            type: DataTypes.INTEGER
        },
        active: {
            type: DataTypes.INTEGER,
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        }
    }
    let config = {
        tableName: 'genres',
        timestamps: false
    }


    let Genero = sequelize.define(alias, columns, config);

    Genero.associate = (models) => {
            Genero.hasMany(models.Peliculas, {
            as: "generoPelicula",
            foreignKey: 'genre_id'
        })

        // Genero.belongsToMany(models.Pelicula, {
        //     as: 'peliculas',
        //     through: models.Peliculas_Generos,
        //     foreignKey: 'movie_id',
        //     otherKey: 'actor_id'
        // }), 
        
    //     Pelicula.hasMany(models.Peliculas_Actores, {
    //         as: 'peliculaActores',
    //         foreignKey:'movie_id'
    //     })
    } 

return Genero; 

}