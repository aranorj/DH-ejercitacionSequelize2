const db = require('./database/models')

module.exports = {
    getAll: async function () {
        try {
            const AllGenres = await db.Generos.findAll({
                include: [{association: 'peliculas'}]
            })
            return AllGenres
        } catch (error) {
            return error
        }
    },
    getBy: async function (id) {
        try {
            const genreDetail = await db.Generos.findOne({
                where: {id}, 
                include: [{association: 'peliculas'}], 
            })
            return genreDetail
        } catch (error) {
            return error
        }
    }
}