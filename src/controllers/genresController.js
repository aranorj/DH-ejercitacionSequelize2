const genreService = require('../model/genreService.js')

module.exports = {
    list: async function(req,res) {
        try {
            const response = await genreService.getAll()
            console.log(response)
            res.render('genresList', {genres: response})
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    detail: async function(req,res) {
        try {
            const response = await genreService.getBy(req.params.id)
            res.render('genresDetail', {genre: response})
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}