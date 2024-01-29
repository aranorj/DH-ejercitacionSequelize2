const { Association } = require('sequelize')
const db = require('./database/models')

module.exports = {
    getAll: async function () {
        try {
            const AllGenres = await db.Generos.findAll({
                include: [{association: 'generoPelicula'}]
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
                include: [{association: 'generoPelicula'}], 
                // attributes: ['generoPelicula']
                raw: true
            })
            return genreDetail
        } catch (error) {
            return error
        }
    }
}