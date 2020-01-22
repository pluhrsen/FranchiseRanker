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
