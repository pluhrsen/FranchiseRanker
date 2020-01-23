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

router.put('/:franchiseId', async (req, res, next) => {
  try {
    ///req.body = {list:[{id, rank}, {id, rank}]}
    for (let i = 0; i < req.body.list.length; i++) {
      let curMovieObj = req.body.list[i]
      let [a, b] = await Movie.update(
        {
          rank: curMovieObj.rank
        },
        {where: {id: curMovieObj.id}}
      )
    }
    const franchiseMovies = await Movie.findAll({
      where: {franchiseId: req.params.franchiseId},
      include: [{model: Franchise}]
    })

    res.send(franchiseMovies)
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
