const db = require('./database/models')

const peliculaService = {
    getAll: async function () {
        try {
            return await db.Peliculas.findAll()
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getBy: async function (id) {
        return await db.Peliculas.findByPk(id, {
            include: [{
                association: 'actores'
            }]
        });
    },
    updateBy: async function (id, body) {
        try {
            return await db.Peliculas.update(
                new Pelicula(body), {
                    where: {
                        id: id
                    }
                }
            )
        } catch (error) {
            console.log(error);
            throw new Error("No se pudo modificar la peli")
        }
    },
    deleteBy: function (id) {
        return new Promise((resolve, reject) => {
            db.Peliculas.destroy({
                    where: {
                        id: id
                    }
                })
                .then((resultado) => {
                    resolve(resultado)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    add: async function (body) {
        try {
            const pelicula = new Pelicula(body);
            return await db.Peliculas.create(pelicula);
        } catch (error) {
            console.log(error);
        }
    }
}


function Pelicula({
    title,
    rating,
    awards,
    release_date,
    length,
    genres
}) {
    this.title = title;
    this.rating = rating;
    this.awards = awards;
    this.release_date = release_date;
    this.length = length;
    this.genre_id = genres;
}

module.exports = peliculaService;