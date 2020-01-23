const router = require('express').Router()
const {Movie, Franchise} = require('../db/models')
module.exports = router

router.get('/:franchiseId', async (req, res, next) => {
  try {
    const franchiseMovies = await Movie.findAll({
      where: {franchiseId: req.params.franchiseId},
      include: [{model: Franchise}]
    })
    res.json(franchiseMovies)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    let updateMovie
    ///req.body = {list:[{id, rank}, {id, rank}]}
    for (let i = 0; i < req.body.list.length; i++) {
      let curMovieObj = req.body.list[i]
      let [a, b] = await Movie.update(
        {
          rank: curMovieObj.rank
        },
        {where: {id: curMovieObj.id}}
      )
      updateMovie = [a, b]
    }
    res.send(updateMovie)
  } catch (err) {
    next(err)
  }
})

// function updateRow(id, rank) {
//   return Movie.update(
//     {
//       rank
//     },
//     {
//       where: {id}
//     }
//   )
// }
